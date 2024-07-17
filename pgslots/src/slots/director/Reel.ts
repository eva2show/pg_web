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

    objects: any[] = [];
    _pos: number = 0;
    _other: number = 0;
    gap: number = 0;

    isH: boolean = false;
    code: number = -1;
    count: number = 1;

    cellSize: number = 0;
    baseSize: number = 0;

    //格子大小的一半。
    size2: number = 0;

    _visible:boolean = true;

    constructor(ops: any) {

        const { isH, baseSize, gap } = ops;
        this.isH = isH;
        this.baseSize = baseSize;
        this.gap = gap;

    }

    get visible(){
        return this._visible;
    }

    set visible(v){
        this.objects.forEach(o => {
            o.visible = v;
        });
        this._visible = v;
    }

    updateItem(item: any) {

        this.count = item.size;
        this.code = item.code;
        this.objects = item.list;
        this.cellSize = this.baseSize * this.count - this.gap;
        this.size2 = this.cellSize / 2;
        let v = this._other;
        this.objects.forEach(o => {
            this.isH ? o.y = v : o.x = v;
        });

    }
    set other(v) {
        this._other = v;
        this.objects.forEach(o => {
            this.isH ? o.y = v : o.x = v;
        });
    }

    get other() {
        return this._other;
    }

    set pos(v) {
        this._pos = v;
        this.objects.forEach(o => {
            this.isH ? o.x = v : o.y = v;
        });
    }
    get pos() {
        return this._pos;
    }

    setPosition(ops: any) {
        let { x, y } = ops;
        this.objects.forEach(o => {
            o.position.set(x, y);
        });
    }

}




class Reel {

    //方向
    align: "start2end" | "end2satrt" = "start2end";

    //移动方向
    _exp: number = 1;

    //正序，逆序。
    isOrder: boolean = true;

    direction: "vertical" | "horizontal" = "vertical";

    isH: boolean = false;

    //开始位置
    startPos: number = 0;

    gap: number = 0;
    // animation: Animation;

    //基准位置
    position: Point = new Point;

    //目标位置
    targetPos: number = 0;

    otherPos: number = 0;

    //需要运动的距离
    lengthPos: number = 0;

    speed: number = 0;

    count: number = 0;

    size: number[] = [];

    running: boolean = false;

    // 0什么都不做， 1 = 开始动画， 2= 循环动画 ， 3 = 结束动画。
    loopStatus: number = 0;

    //结束时，循环和结束动画的切换标志。
    loopChange: boolean = false;

    //动画计时器 ms
    aniTime: number = 0;

    //当前运行时间
    runTime: number = 0;

    //退出时间，用来判定运行的最小时间 3秒
    minTime: number = 2000;

    // 一圈滚轮的时间， 总时间 = 滚轮x2 + minTime - 
    curDuration: number = 1200;

    //动画运行时间配置
    duration: number = 1000;

    //动画延迟时间，当开始后的延迟时间。
    delay:number = 0;

    //退出标志
    outStatus: boolean = false;
    stopStatus: boolean = false;

    easeIn = EASE.easeInBack;
    easeOut = EASE.easeOutBack;

    cellMap: Item[] = [];

    //循环元素
    loopMap: Item[] = [];

    onEnd:(()=>void) |null=null;

    //每个位置对应的code，跨格子使用相同code
    cards: number[] = [];

    outCards: number[] = [];

    //对象池，用于通过code获取元素
    getter: any = null;

    cellSize: number = 0;
    cellSizeGap: number = 0;

    //元素实际位置 = positio.? + offsetPos + item.offset
    offsetPos: number = 0;


    name = "reel";

    //获取对应的位置的map。
    getMap(i: number) {
        return this.cellMap[i];
    }

    updateMap(cards: number[]) {

        let __cards = [...cards];
        if(!this.isOrder)__cards.reverse();

        this.cellMap.forEach((item, i) => {
            this.resetItem(item);
            this.updateItem(item, __cards[i]);
        });

    }
    // anchor，锚点，  isOrder:正序，逆序, 数组顺序 arrOrder， 正序 12345  逆序，54321
    setPosition(items: Item[], anchor: number, isOrder: boolean, arrReverse:boolean = false ) {

        let offsetPos = anchor;
        const exp = isOrder ? 1 : -1;
        let _arr = [...items];
        arrReverse && _arr.reverse();

        _arr.forEach(item => {
            item.pos = offsetPos + item.size2 * exp;
            offsetPos = offsetPos + (item.cellSize + item.gap) * exp;
        });
    }
    setLoopPosition(items: Item[], anchor: number, isOrder: boolean, speed: number = 0) {


        let _arr = [...items];
        _arr.forEach(item => {
            item.pos += speed;
        });

        // anchor = this.startPos;

        let anchorItem;
        let fangxiang = speed>0;
        const exp = isOrder ? 1 : -1;

        if( fangxiang ){
            anchorItem =  isOrder? items[0]: items[items.length-1];

            
        }else{  
            anchorItem =  !isOrder? items[0]: items[items.length-1];
        }
        let pos  = anchorItem.pos + anchorItem.size2*exp;
        // let anchorItem =  ( fangxiang&&isOrder )   ?items[0]:items[items.length-1];

        const s2e = ()=>{

            let startObject = items.shift() as Item;
            let endObjecr = items[items.length-1] as Item;
            
            startObject.pos = endObjecr.pos + (endObjecr.size2 + startObject.size2 + startObject.gap)*exp;

            items.push(startObject);
            // isUpdate = true;
        };

        const e2s = ()=>{

            let endObjecr = items.pop() as Item;
            let startObject = items[0] as Item;
            
            endObjecr.pos = startObject.pos - (startObject.size2 + endObjecr.size2 + endObjecr.gap)*exp;

            items.unshift(endObjecr);
            // isUpdate = true;

            // let orderObject = items.pop() as Item;
            // orderObject.pos = item0.pos - item0.size2 - orderObject.size2 - item0.gap;
            // items.unshift(orderObject);
            // isUpdate = true;
        };

        // if( fangxiang ){
        //     anchorItem =  isOrder? items[0]: items[items.length-1];
        // }else{  
        //     anchorItem =  !isOrder? items[0]: items[items.length-1];
        // }



        if (fangxiang && anchorItem.pos > anchor) {
            isOrder ? e2s() : s2e();
        } else if (!fangxiang && anchorItem.pos < anchor) {
            isOrder ? s2e() : e2s();
        }

        // console.log("setLoopPosition:", anchor, anchorItem.pos, isOrder,speed, exp);
        return pos

    }
    resetItem(item:Item){
        this.getter.resetObject(item.objects);
        item.objects = [];
    }

    updateItem(item: Item, code: number, isBlur: boolean = false) {
        // this.resetItem(item);
        let object = this.getter.getObject(code, isBlur, this.name);
        item.updateItem(object);
    }

    constructor(ops: any) {

        let { getter, name, count, gap, cards, direction,delay,duration, align, size, position } = ops;
        this.getter = getter;
        this.count = count;

        this.gap = gap;

        this.cards = cards||[];
        this.size = size;
        this.direction = direction;
        this.align = align;
        this.duration = duration||1000;
        this.delay = delay || 0 ;
        this.name = name || "name";


        // console.log("====constructor",this.delay)
        // this.isOrder = isOrder === undefined ? true : isOrder;

        if (position) {
            this.position.set(position.x, position.y);
        }


        this.init();

    }
    updateBound() {

        const { count, size, gap, isOrder } = this;
        const isH = this.isH = this.direction === "horizontal";

        const cell = isH ? size[0] + gap : size[1] + gap;
        this.cellSizeGap = cell;
        this.cellSize = cell - gap;

        this.lengthPos = cell * count + gap;

        this.startPos = isH ? this.position.x : this.position.y;

        // 设置开始点 个 目标点。
        // 运动方向也是从开始点到目标点。

        if(this.align==="start2end"){

            this.targetPos = this.startPos + this.lengthPos;
            this._exp = 1;
            this.isOrder = true;

        }else{

            this.targetPos = this.startPos;
            this.startPos = this.startPos + this.lengthPos; 
            this._exp = -1;
            this.isOrder = false;

        }


        // if(align){
        //     this.targetPos = this.startPos + this.lengthPos;
        // }else{
        //     this.targetPos = this.startPos;
        //     this.startPos = this.startPos + this.lengthPos;
        // }
      
        this.otherPos = isH ? this.position.y + size[1] / 2  : this.position.x + size[0] / 2 ;
    }

    start() {

        if (this.running) return;
        this.running = true;

        const __start = ()=>{

            let sout = EASE.easeOutBack(F / this.curDuration) * this.lengthPos;
            this.loopStatus = 1;
            this.curDuration = this.duration;
            this.aniTime = 0;
            this.speed = sout;
            this.outStatus = false;
            this.stopStatus = false;
            this.loopChange = false;
            this.runTime = 0;
            this.loopMap.forEach(item=>{
                this.updateItem(item, -1, true);
            });
            
        };
        
        if(this.delay>0){
            setTimeout(__start,this.delay);
        }else{
            __start();
        }

    }
    _onEnd() {

        console.log("=======_onEnd")

        this.running = false;
        this.loopStatus = 0;

        this.updateBound();
        this.setPosition(this.cellMap, this.startPos,  this.isOrder );

        this.loopMap.forEach(item=>{
            this.resetItem(item);
        });
       

        if(this.onEnd){
            this.onEnd();
        }


        // 归还所有loop

    }
    //设置结束
    setEnd(cards:number[]|null, callback:()=>void|null ) {

        if (!this.running || this.stopStatus) return;
        this.stopStatus = true;

        let __delay = (this.minTime + this.delay)-this.runTime;
        if(cards){
            this.outCards = cards;
        }

        if(typeof callback === 'function'){
            this.onEnd = callback;
        }

        const __end = ()=>{
            this.outStatus = true;
        };

        if(__delay>0){

            setTimeout(__end,__delay)
        }else{
            __end();
        }



        
    }

    init() {

        this.updateBound();

        for (let i = 0, l = this.count; i < l; i++) {

            let obj = new Item({
                isH: this.isH,
                baseSize: this.cellSizeGap,
                gap: this.gap
            });

            obj.other = this.otherPos;
            this.cellMap[i] = obj;

        }

        for (let i = 0, l = this.count + 2; i < l; i++) {

            let obj = new Item({
                isH: this.isH,
                baseSize: this.cellSizeGap,
                gap: 0
            });
            obj.other = this.otherPos;
            this.loopMap[i] = obj;

            // this.updateItem(obj, -1, true);

        }

        this.updateMap(this.cards);
        this.outCards = [...this.cards];


        this.setPosition(this.cellMap, this.startPos,  this.isOrder );
        // this.setPosition(this.loopMap, this.startPos,  !this.isOrder  );

        // console.log(this);
    }

    update(d: any) {

        if (!this.running) return;

        const { loopStatus, outStatus, startPos, lengthPos, _exp, loopChange, isOrder, targetPos, speed, aniTime, curDuration } = this;

        const deltaMS = d.deltaMS;
        this.runTime += deltaMS;

        const curT = aniTime + deltaMS;

        this.aniTime = curT;

        //动画分量t
        const t = curT / curDuration;
        let delta = d.deltaTime;

        let tpos = 0;
        let __start = 0;
        // console.log("update:",loopStatus, loopChange,  outStatus, this.targetPos,speed);
        let __offset = targetPos - startPos;
        let exp = _exp;
        let _lengthPos = lengthPos*exp;

        switch (loopStatus) {

            case 1:

                //如果开始阶段结束，就进入下一个状态。

                if (t > 1) {
                    this.loopStatus = 2;
                    this.offsetPos = __offset;
                } else {
                    tpos = this.easeIn(t);
                    this.offsetPos = __offset * tpos;
                }

                __start = this.startPos + this.offsetPos;

                this.setPosition(this.cellMap, __start, isOrder );
                this.setPosition(this.loopMap, __start, !isOrder );

                break;

            case 2:

                let _speed = speed * delta * exp;
                
                if (loopChange) {

                    this.offsetPos += _speed;

                    if( (isOrder && this.offsetPos>startPos) || (!isOrder && this.offsetPos<startPos)){

                            this.offsetPos = startPos;

                            this.setPosition(this.cellMap, this.offsetPos, isOrder);
                            this.setPosition(this.loopMap, this.offsetPos + _lengthPos, isOrder, true);

                            this.loopStatus = 3;
                            this.aniTime = 0;

                    }else{

                        this.setPosition(this.cellMap, this.offsetPos, isOrder);
                        this.setPosition(this.loopMap, this.offsetPos+_lengthPos, isOrder, true);
                    }
                
                  
                
                } else if( outStatus ){

                    let __pos = this.setLoopPosition(this.loopMap, startPos, !isOrder, _speed) as number;

                    this.offsetPos = __pos - lengthPos*exp;
                    
                    this.updateMap( this.outCards );
                    this.setPosition( this.cellMap, this.offsetPos, isOrder );

                    this.targetPos = this.startPos;
                    this.startPos = this.startPos - lengthPos*exp;

                    // console.log("SET-outStatus",__pos, this.startPos, this.targetPos, lengthPos,exp);

                    this.loopChange = true;
                    
                }else{

                    this.setLoopPosition( this.loopMap, startPos, !isOrder, _speed);

                }

                break;

            case 3:

                if (t > 1) {
                    
                    // __start = this.targetPos;

                    // this.setPosition(this.cellMap, __start, isOrder);
                    // this.setPosition(this.loopMap, __start+_lengthPos, isOrder,true);
                    this._onEnd();

                } else {

                    tpos = this.easeOut(t);
                    
                    this.offsetPos = tpos * __offset;

                    __start = this.startPos + this.offsetPos;
    
                    this.setPosition(this.cellMap, __start, isOrder);
                    this.setPosition(this.loopMap, __start + _lengthPos, isOrder,true);

                }
                
            break;

        }

    }


}

export { Reel }