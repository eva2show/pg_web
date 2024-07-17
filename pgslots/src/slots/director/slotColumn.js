import { Container, Texture, Sprite,Point, Graphics } from "pixi.js";
import { gsap } from 'gsap';

const WHITE = Texture.WHITE;

/**状态切换按钮 */
export default {

    type: "slotColumn",
    textureMap: {},
    default: {
        resultTexture: [],
        loopTexture: [],
        textures: [],
        count: 1,
        gap: 0,
        size: 50
    },
    create(c, ui) {

        const textures = {};
        c.textures.forEach(k => {
            textures[k] = ui.assets[k];
        });
        const column = new SlotColumn({
            ...c,
            textures
        });

        return column
    },
};

// const ES = 1.70158;
const ES = 1;
const F = 1000 / 60;
const EASE = {
    easeInBack: function (pos) {
        return (pos) * pos * ((ES + 1) * pos - ES);
    },
    easeOutBack: function (pos) {
        return (pos = pos - 1) * pos * ((ES + 1) * pos + ES) + 1;
    }
};


class SlotColumn extends Container {

    constructor({ textures, isTest, loopTexture, resultTexture, count, size, gap, animation }) {

        super();

        this.animation = {
            delay: 0,
            duration: 1200,
            ...animation
        };

        this.positionY = 100;
        this.speedY = 2;

        this.count = count;
        this.gap = gap;

        if (Array.isArray(size)) {
            this.size = size;
        } else {
            this.size = [size, size];
        }

        this.__mask = null;

        // [ texture]
        this.textures = textures;

        // loopTexture = [ name, name ]; 
        this.loopTexture = loopTexture;

        // loopTexture = [ name, name ]; 
        this.resultTexture = resultTexture;


        this.running = false;
        //游戏结果。
        this.results = [];
        //元素循环。
        this.loops = [];
        this.isTest = !!isTest;

        this.running = false;


        //每个格子的高度。
        this.cellH = 0;

        // 0什么都不做， 1 = 开始动画， 2= 循环动画 ， 3 = 结束动画。
        this.loopStatus = 0;

        //结束时，循环和结束动画的切换标志。
        this.loopChange = false;

        //计时器当前毫秒
        this.curTime = 0;

        //当前运行时间
        this.runTime = 0;

        //退出时间，用来判定运行的最小时间 3秒
        this.outTime = 3000;

        //毫秒当前动画的总时间
        this.curDuration = 1200;

        //当前的position值。
        this.curPosition = 0;

        //退出标志
        this.outStatus = false;


        this.__results = [];

        this.onResult = null;

        // this.init();

    }
    getPosition( idx, t ){

        let s = this.results[idx];
        let p = t? this.position : new Point;

        if(s){
            return s.toGlobal(p);
        }
    }

    runOut(){

        this.loopStatus = 0;
        this.loops.forEach(s => {
            s.visible = false;
        });
        this.running = false;
        this.outStatus = false;
        if(this.onResult)this.onResult();

    }

    changeResult( results = this.__results ){

        results.forEach( (n,i)=>{
            this.setTexture(this.results[i],this.textures[n]);
        });

    }

    //设置结果 results = [ name, name, name ];
    setResult(results) {

        if (!this.running) return;
        if(this.outStatus)return;
        this.outStatus = true;

        this.__results = results; 

        let delayTime = this.animation.delay;
        delayTime = delayTime + Math.max(this.outTime - this.runTime,0);

        const start__ = _ => {

            this.changeResult(results);

            this.results.forEach(s => {
                s.visible = true;
            });

            this.curDuration = this.animation.duration ;
            this.curTime = 0;
            let sout = EASE.easeOutBack(F / this.curDuration) * this.positionY;
            this.speedY = sout;
            this.loopChange = true;

        }

        if (delayTime) {
            setTimeout(start__, delayTime);
        } else {
            start__();
        }


    }

    //开始，会一直滚动，直到收到结果请求。
    // results = ["textureName","textureName",...];

    start() {

        if (this.running) return;
        this.running = true;
        this.runTime = 0;

        const start__ = _ => {
            this.loopStatus = 1;
            this.curDuration = this.animation.duration ;
            this.curTime = 0;

            let sout = EASE.easeOutBack(F / this.curDuration) * this.positionY;
            this.speedY = sout;

            this.results.forEach(s => {
                s.visible = true;
            });
            this.loops.forEach(s => {
                s.visible = true;
            });
        };

        if (this.animation.delay > 0) {
            setTimeout(start__, this.animation.delay);
        } else {
            start__();
        }

    }
    update2(d, deltaMS) {

        const { loopStatus, positionY, loopChange, gap, speedY, cellH, curTime, curDuration } = this;

        this.runTime += deltaMS;
        const curT = curTime + deltaMS;
        const pos = curT / curDuration;
        const perY = positionY + cellH;

        let sy;
        let tpos = 0;
        let targetPosition = 0;

        switch (loopStatus) {

            case 1:

                if (pos > 1) {
                    this.loopStatus = 2;
                    this.results.forEach(s => {
                        s.visible = false;
                    });
                    break;
                }

                tpos = EASE.easeInBack(pos);
                targetPosition = tpos * positionY;
                this.results.forEach((s, i) => {
                    s.y = targetPosition + (i * cellH);
                });

                sy = targetPosition - gap;
                this.loops.forEach((s, i) => {
                    s.y = sy - ((i + 1) * cellH);
                });

                this.curTime = curT;

                break;

            case 2:

                this.loops.forEach((s, i) => {

                    if (this.loopStatus !== 2) return;
                    let py = s.y + (speedY * d);

                    if (py > positionY) {

                        if (this.loopChange) {
                            this.loopStatus = 3;
                            this.loopChange = false;
                            let ids = [];
                            const len = this.loops.length;
                            this.loops.forEach((s1, i1) => {
                                let si = i + 1 + i1;
                                if (si >= len) {
                                    si = si - len;
                                }
                                ids[i1] = this.loops[si].texture;
                            });

                            this.loops.forEach((s, i) => {

                                this.setTexture(s,ids[i],2);

                                // s.texture = ids[i];
                                // s.texture.update();
                            });


                        } else {

                            s.y -= perY;
                            // s.texture = this.random(1);
                            this.setTexture(s,this.random(1),2);

                        }

                    } else {
                        s.y = py;
                    }
                });

                break;

            case 3:

                if (pos > 1) {
                    this.runOut();
                    break;
                }

                tpos = EASE.easeOutBack(pos);
                targetPosition = tpos * positionY - positionY;

                this.results.forEach((s, i) => {
                    s.y = targetPosition + (i * cellH);
                });

                sy = targetPosition + positionY + gap;
                this.loops.forEach((s, i) => {
                    s.y = sy + (i * cellH);
                });

                this.curTime = curT;
                break;
        }


    }

    update(d, deltaMS) {
        this.update2(d, deltaMS);
    }

    setTexture( s, t, scale = 1 ){

        const cellW = this.size[0];
        const cellH = this.size[1];

        if(t===this.textures['wild']){
            scale = 1;
        }else{
            scale = scale>1?1.5:1;
        }

        s.texture = t;
        s.scale.x = s.scale.y = scale * Math.min(cellW / t.width, cellH / t.height);

    }

    random(isLoop) {

        let arr = isLoop ? this.loopTexture : this.resultTexture;
        let idx = Math.floor(Math.random() * arr.length);
        let tex = this.textures[arr[idx]] || WHITE;
        if(!this.textures[arr[idx]]){
            console.log("白色图片：", arr[idx]);
        }


        return  tex ;//this.isTest ? WHITE :tex;
    }

    getTexture(tName) {

        // let arr = isLoop ? this.loopTexture : this.resultTexture;
        // let idx = Math.floor(Math.random() * arr.length);
        let tex = this.textures[tName] || WHITE;
        if(!this.textures[tName]){
            console.log("白色图片：", tName);
        }


        return  tex ;//this.isTest ? WHITE :tex;
    }


    init(items) {

        const { count, isTest, size, gap } = this;

        const cell = size[1] + gap;
        this.cellH = cell;
        this.positionY = cell * count;

        this.speedY = this.positionY / (this.animation.duration  / 60);
        if (isTest) this.speedY /= 5;
        // 模糊图
        for (let i = 0, l = count + 1; i < l; i++) {

            let t = this.random(1);

            const s = new Sprite(t);
            s.anchor.set(.5, .5);

            if (t === WHITE) {
                s.width = size[0];
                s.height = size[1];
            } else {
                this.setTexture(s,t,2);
            }
            s.y = cell * i;
            s.visible = false;
            this.loops.push(s);
            this.addChild(s);

        }

        for (let i = 0, l = count; i < l; i++) {

            let t = this.getTexture(items[i]);
            const s = new Sprite(t);

            if (t === WHITE) {
                s.width = size[0];
                s.height = size[1];
                s.tint = 0xff0000;
            } else {
                this.setTexture(s,t);
            }
            s.anchor.set(.5, .5);
            s.y = cell * i;

            this.results.push(s);
            this.addChild(s);

        }
        const graphics = this.__mask = new Graphics;
        graphics.x = -size[0] * .5;
        graphics.y = - cell * .5;

        // graphics.zIndex = -1;
        graphics.beginFill(0, isTest ? .5 : 1);
        graphics.drawRect(0, 0, size[0], cell * count - gap);
        graphics.endFill();
        this.addChild(graphics);

        this.enableMask(!isTest);
    }

    enableMask(bool) {

        console.log("enableMask:", bool)
        this.mask = bool ? this.__mask : null;
    }

}
