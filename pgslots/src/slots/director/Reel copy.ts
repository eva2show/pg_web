// import { Container, Texture, Sprite, Point, Graphics } from "@/core/pixijs.js";

import { Container, Texture, Sprite, Point, Graphics } from "pixi.js";

const ES = 0.5;
const F = 1000 / 60;
const EASE = {
    easeInBack: function (pos: number) {
        return (pos) * pos * ((ES + 1) * pos - ES);
    },
    easeOutBack: function (pos: number) {
        return (pos = pos - 1) * pos * ((ES + 1) * pos + ES) + 1;
    }
};


class Item {

    objects:any[]=[];
    _pos:number=0;
    _other:number=0;
    gap:number=0;

    isH:boolean = false;
    code:number = -1;
    count:number = 1;

    cellSize:number = 0;
    baseSize:number = 0;

    //格子大小的一半。
    size2:number = 0;

    constructor(ops:any){

        const { isH, baseSize, gap} = ops;
        this.isH = isH;
        this.baseSize = baseSize;
        this.gap = gap;

    }

    updateItem(item:any){
        
        this.count = item.size;
        this.code = item.code;
        this.objects = item.list;
        this.cellSize = this.baseSize*this.count - this.gap;
        this.size2 = this.cellSize/2;
        let v = this._other;
        this.objects.forEach(o=>{
            this.isH?o.y=v:o.x=v;
        });

    }
    set other(v){
        this._other = v;
        this.objects.forEach(o=>{
            this.isH?o.y=v:o.x=v;
        });
    }

    get other(){
        return this._other;
    }

    set pos(v){
        this._pos = v;
        this.objects.forEach(o=>{
            this.isH?o.x=v:o.y=v;
        });
    }
    get pos(){
        return this._pos;
    }

    setPosition(ops:any){
        let {x,y} = ops;
        this.objects.forEach(o=>{
            o.position.set(x,y);
        });
    }

}




class Reel {

    //方向
    align: "start-end" | "end-satrt" = "start-end";

    //正序，逆序。
    isOrder:boolean = true;

    direction: "vertical" | "" = "vertical";

    isH: boolean = false;

    //开始位置
    startPos: number = 0;

    gap: number = 0;
    assets: any = null;
    // animation: Animation;

    //基准位置
    position: Point = new Point;

    //目标位置
    targetPos: number = 0;

    otherPos:number = 0;
    
    speed: number = 0;

    count: number = 0;

    size: number[] = [];

    running: boolean = false;
    __results: number[] = [];

    // 0什么都不做， 1 = 开始动画， 2= 循环动画 ， 3 = 结束动画。
    loopStatus: number = 0;

    //结束时，循环和结束动画的切换标志。
    loopChange: boolean = false;

    //动画计时器 ms
    aniTime: number = 0;

    //当前运行时间
    runTime: number = 0;

    //退出时间，用来判定运行的最小时间 3秒
    minTime: number = 30000;

    //毫秒当前动画的总时间
    curDuration: number = 1200;

    //动画运行时间配置
    duration: number = 1000;

    //退出标志
    outStatus: boolean = false;

    easeIn = EASE.easeInBack;
    easeOut = EASE.easeOutBack;

    // k = code, v = { 
    //     res, 
    //     loop, 
    //     size:1 
    // }

    //idx size的第几个格子。 只要不是第0，都可以略过/
    // list 这个位置的元素组合。
    //每个位置的元素{ code, size, list:[], offset:number }
    // 如果是null 表示为上一个的跨格
    //显示元素
    cellMap:Item[] = [];

    //循环元素
    loopMap:Item[] = [];

    //每个位置对应的code，跨格子使用相同code
    cards: number[] = [];

    //格子的长度
    cellLen: number = 0;

    //滚动时的元素列表
    loopObjects: Sprite[] = [];

    //结果元素列表
    resObjects: Sprite[] = [];

    //对象池，用于通过code获取元素
    getter: any = null;

    cellSize: number = 0;
    cellSizeGap: number = 0;

    offsetStart: number = 0;

    //元素实际位置 = positio.? + offsetPos + item.offset
    offsetPos: number = 0;

    boundEnd: number = 0;

    //循环元素最大位置的索引，用与计算排列
    loopMaxI:number = 0;

    //循环元素最小的位置的索引
    loopMinI:number = 0;

    //获取对应的位置的map。
    getMap(i: number) {
        return this.cellMap[i];
    }


    updateMap(cards: number[]) {

        this.cellMap.forEach( (item,i)=>{
            this.updateItem(item,cards[i]);
        });
        this.setPosition(this.cellMap, this.startPos, this.isOrder);

        console.log(this.cellMap);
        // for (let i = 0, l = this.count; i < l;) {
        //     let code = cards[i];
        //     let object = this.getter.getObject(code) as any;
        //     //计算位置

        //     this.cellMap[i].updateItem(object);

        //     let offset = this.offsetStart + i * this.cellSizeGap + (object.size * this.cellSizeGap / 2);

        //     this.cellMap[i] = {
        //         ...object,
        //         offset
        //     };

        //     // console.log("updateMap:",i,l,object);
        //     i += object.size;
        // }

    }
        // anchor，锚点，  isOrder:正序，逆序   isLoop：循环：最小值，大于锚点值，重新排列。 speed：循环速度。
    setPosition( items:Item[], anchor:number, isOrder:boolean, isLoop:boolean=false, speed:number=0 ) {

        let offsetPos = anchor;
        const exp = isOrder?1:-1;
        items.forEach(item=>{
            item.pos = offsetPos + item.size2 * exp;
            offsetPos = offsetPos + (item.cellSize + item.gap)*exp;
        });

    }
    setLoopPosition( items:Item[], anchor:number, isOrder:boolean, speed:number=0 ) {
        
        const exp = isOrder?1:-1;
        items.forEach(item=>{
            item.pos += speed * exp;
        });
        
       
       

    }
    // anchor，锚点，  isOrder:正序，逆序   isLoop：循环：最小值，大于锚点值，重新排列。 speed：循环速度。
    _updatePosition( items:Item[], anchor:number, isOrder:boolean, isLoop:boolean, speed:number ) {

        const { loopMinI, loopMaxI,isH, startPos, cellSizeGap, gap } = this;

        const startOther = isH ? this.position.y : this.position.x;
        let offsetPos = anchor;

        let x=0, y=0, i =0, l = this.loopMap.length, curPos = 0;

        if (isH) {
            y = startOther;
        } else {
            x = startOther;
        }
      
        let ni:number ;

        if(type === "order"){

            //正序，还是逆序；
            isOrder = true;
            ni = loopMinI;

        }else{
            isOrder = false;
            ni = loopMaxI;
        }
        let isSet = false;
        
        // 正序，逆序
        const getNext = ()=>{
            
            if(!isSet){
                isSet = true;
            }else{
                if(isOrder){
                    ni++;
                    if(ni>=l){
                        ni=0;
                    }
                }else{
                    ni--;
                    if(ni<0){
                        ni = l-1;
                    }
                }
            }
            
            let obj = this.loopMap[ni];
            return obj
        };

        //是否需要排序。
        let needOrder = false;
        for(;i<l;i++){
            let obj = getNext();
            needOrder = false;

            if(isLoop){

                curPos = obj.offset + speed*(isOrder?1:-1);
                obj.offset = curPos;

                if( (isOrder&&curPos>pos) || ( !isOrder && curPos<pos)  ){
                    needOrder = true;  
                }

            }else{

                curPos = offsetPos + obj.objectSize/2*(isOrder?1:-1);;  
                offsetPos += obj.objectSize*(isOrder?1:-1);             
            }
            isH?x=curPos:y=curPos;
            obj.list.forEach(o => {
                o.x = x;
                o.y = y;
            });
           
        }
        //当loop的时候需要重新排序。
        if(needOrder){

            //顺序，把远放近
            if(isOrder){

                let maxObj = this.loopMap[loopMaxI];
                let minObj = this.loopMap[loopMinI];

                maxObj.offset = minObj.offset - minObj.objectSize/2 - maxObj.objectSize/2;
                this.loopMinI = loopMaxI;

                this.loopMaxI = loopMaxI-1;
                if(this.loopMaxI<0){
                    this.loopMaxI = l-1;
                }

            }else{
                
                //逆序，把近的放到远处
                let maxObj = this.loopMap[loopMaxI];
                let minObj = this.loopMap[loopMinI];

                minObj.offset = maxObj.offset + maxObj.objectSize/2 + maxObj.objectSize/2;
                this.loopMinI = loopMaxI;

                this.loopMaxI = loopMaxI-1;
                if(this.loopMaxI<0){
                    this.loopMaxI = l-1;
                }
            }

        }

        
    }

    updateItem(item:Item,code:number,isBlur:boolean=false){
        
        this.getter.resetObject(item.objects);
        let object = this.getter.getObject(code, isBlur)
        item.updateItem(object);
        
    }

    initLoop() {

        const { count,isH, startPos, cellSizeGap, gap } = this;

        this.loopMap = [];

        let offsetIdx = 0;

        this.loopMap.forEach( item=>{
            this.updateItem(item,-1,true);
        });


        for (let i = 0, l = count + 1; i < l; i++) {

            this.updateItem()
            let object = this.getter.getObject(-1, true) as any;
            //计算位置
            let objectSize = (object.size * cellSizeGap);
            let offset = offsetIdx - objectSize/2;

            this.loopMap[i] = {
                ...object,
                offset,
                objectSize
                // start: 0,
                // end: (object.size * this.cellSizeGap / 2)
            };

            offsetIdx -= objectSize;
            console.log(offset)
        }

        // let jian = pi * this.cellSizeGap;
        // this.loopMap.forEach((c, i) => {
        //     c.start = -this.targetPos - this.cellSizeGap / 2;
        // });

        const startOther = isH ? this.position.y : this.position.x;

        this.loopMap.forEach((c, i) => {
            let x, y;
            if (isH) {
                x = startPos + c.offset;
                y = startOther;
            } else {
                x = startOther;
                y = startPos + c.offset;;
            }
            c.list.forEach(o => {
                o.x = x;
                o.y = y;
                // if(i===5)o.visible = false;
            });
            // console.log(i,start , c.offset);
        });



        // console.log("initLoop", pi, jian);
    }

    constructor(ops: any) {

        let { getter, count, gap, cards,direction, isOrder, size, position } = ops;
        this.getter = getter;
        this.count = count;

        this.gap = gap;

        this.cards = cards;
        this.size = size;

        this.direction = direction;
      
        this.isOrder = isOrder===undefined?true:isOrder;

        if (position) {
            this.position.set(position.x, position.y);
        }


        this.init();

    }
    updateBound() {

        const { count, size, gap,isOrder } = this;
        const isH = this.isH = this.direction === "horizontal";

        const cell = isH ? size[0] + gap : size[1] + gap;
        this.cellSizeGap = cell;
        this.cellSize = cell - gap;
        this.offsetStart = 0;// + (this.cellSize/2);

        this.targetPos = cell * count + gap;
        this.startPos = isH ? this.position.x : this.position.y;

        const exp = isOrder?1:-1;


        this.otherPos = isH ? this.position.y +  size[1]/2*exp : this.position.x + size[0]/2*exp;


    }
    updatePosition() {

        const { isH, startPos } = this;

        const start = startPos + this.offsetPos;
        const startOther = isH ? this.position.y : this.position.x;

        this.cellMap.forEach(c => {
            let x, y;
            if (isH) {
                x = start + c.offset;
                y = startOther;
            } else {
                x = startOther;
                y = start + c.offset;;
            }

            c.list.forEach(o => {
                o.x = x;
                o.y = y;
                // o.visible = false;
            });
        });

        // console.log("updatePosition:",start);

    }

    start() {

        if (this.running) return;

        this.runTime = 0;
        this.loopStatus = 1;

        let sout = EASE.easeOutBack(F / this.curDuration) * this.targetPos;

        this.curDuration = this.duration;
        this.aniTime = 0;
        this.speed = sout;
        this.running = true;

    }
    _onEnd() {

        console.log("=======_onEnd")

        this.runTime = 0;
        this.loopStatus = 0;
        this.running = false;
        this.initLoop();
        this.updatePosition();

    }
    //设置结束
    setEnd(cards: number[]) {

        const delayTime = Math.max(this.minTime - this.runTime, 0);

        const endFn = () => {
            console.log("endFn");
            this.cards = cards;
            this.cellMap.forEach(c => {
                this.getter.resetObject(c.list);
            });
            this.cellMap = [];
            this.offsetPos = - this.targetPos;
            this.updateMap(cards);
            this.updatePosition();
            this.loopChange = true;
        };

        if (delayTime) {
            setTimeout(endFn, delayTime);
        } else {
            endFn();
        }

        console.log("setEnd:", this.minTime, this.runTime, delayTime);


    }

    init() {

        this.updateBound();
        
        for(let i=0,l=this.count;i<l;i++){
            
            let obj = new Item({
                isH:this.isH,
                baseSize:this.cellSizeGap,
                gap:this.gap
            });

            obj.other = this.otherPos;
            console.log("init:",obj.other);

            this.cellMap[i] = obj;

        }

        for(let i=0,l=this.count+1;i<l;i++){

            let obj = new Item({
                isH:this.isH,
                baseSize:this.cellSizeGap,
                gap:0
            });

            obj.other = this.otherPos;

            this.loopMap[i] = obj;

           
        }
        
        
        this.updateMap(this.cards);

        // this.initLoop();
        // this.updatePosition();
        console.log(this);

    }

    update(d) {

        if (!this.running) return;

        const { loopStatus, isH, startPos, offsetPos, loopChange, cellSize, targetPos, speed, aniTime, curDuration } = this;

        const deltaMS = d.deltaMS;
        this.runTime += deltaMS;


        const curT = aniTime + deltaMS;

        this.aniTime = curT;


        //动画分量t
        const t = curT / curDuration;
        let delta = d.deltaTime;

        let tpos = 0;

        // let start = (isH ? this.position.x : this.position.y) + this.offsetPos;
        // let loopStart = start;
        const startOther = isH ? this.position.y : this.position.x;

        let __start: number = 0;

        // console.log(t,loopStatus);


        switch (loopStatus) {

            case 1:
                //如果开始阶段结束，就进入下一个状态。
                if (t > 1) {
                    this.loopStatus = 2;
                    this.offsetPos = targetPos;
                } else {
                    tpos = this.easeIn(t);// EASE.easeInBack(t);
                    this.offsetPos = tpos * targetPos;
                }
                __start = this.offsetPos + startPos;

                this.updatePosition();
                this.loopMap.forEach(c => {
                    let x, y;
                    if (isH) {
                        x = __start + c.offset;
                        y = startOther;
                    } else {
                        x = startOther;
                        y = __start + c.offset;;
                    }
                    c.list.forEach(o => {
                        o.x = x;
                        o.y = y;
                    });
                });

                break;

            case 2:
                //循环...
                const c2 = cellSize / 2;
                __start = startPos + targetPos;
                let _speed = speed * delta;

                this.loopMap.forEach((c, i, arr) => {
                    if (this.loopStatus !== 2) return;
                    let x, y, tmp;
                    c.offset += _speed;




                    if (c.offset > c.end) {

                        if (loopChange) {

                            this.offsetPos = -targetPos ;
                            this.loopChange = false;
                            this.loopStatus = 3;
                            this.aniTime = 0;
                            this.updatePosition();

                            return;

                        }else{
                            c.offset = c.start;
                        }
                    }

                    if (isH) {
                        x = __start + c.offset;
                        y = startOther;
                    } else {
                        x = startOther;
                        y = __start + c.offset;;
                    }
                    c.list.forEach(o => {
                        o.x = x;
                        o.y = y;
                    });




                });




                /*
                this.loopMap.forEach((c, i,arr) => {
                    if(this.loopStatus !==2 )return;
                    c.offset += speed * delta;//*0.1;
                    let x, y, tmp;

                    if( this.loopChange && i===arr.length-1){
                      
                        tmp = __start + c.offset;
                      


                        if( (__start - targetPos + c.offset) >  c2 ){
                            this.offsetPos = -targetPos ;
                            this.loopChange = false;
                            this.loopStatus = 3;
                            this.aniTime = 0;
                            this.updatePosition();
                            return;
                        }

                    }

                    if (c.offset > c.end) {

                        if (this.loopStatus===2) {
                            c.offset = c.start;
                        }

                    } else {

                        if (isH) {
                            x = __start + c.offset;
                            y = startOther;
                        } else {
                            x = startOther;
                            y = __start + c.offset;;
                        }
                        c.list.forEach(o => {
                            o.x = x;
                            o.y = y;
                        });
                    }

                });
*/

                break;

            case 3:

                if (t > 1) {
                    // this.loopStatus = 2;
                    this.offsetPos = 0;

                } else {
                    tpos = this.easeOut(t);
                    this.offsetPos = - (1 - tpos) * targetPos;
                }

                __start = startPos + targetPos + targetPos + this.offsetPos;

                this.updatePosition();

                this.loopMap.forEach(c => {
                    let x, y;
                    if (isH) {
                        x = __start + c.offset;
                        y = startOther;
                    } else {
                        x = startOther;
                        y = __start + c.offset;;
                    }
                    c.list.forEach(o => {
                        o.x = x;
                        o.y = y;
                    });
                });
                if (t >= 1) {
                    this._onEnd();
                }
                break;

        }

    }


}

export { Reel }