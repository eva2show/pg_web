import type { Director  } from "./director.ts";

class BaseAction {
    director:Director;
    name:string;

    // 当前动作的状态
    // 每个行动结束，都需要更新状态，其他行动通过监听行动变化，执行相应的行动。
    _status:string="ready";

    _refs:Record<string,any>={};
    constructor(ops:{ director:Director, refs:string[], name:string }){
        this.director = ops.director;
        Array.isArray(ops.refs)&&ops.refs.forEach(k=>{

            let obj = this.director.ctx.getById(k);
            if(!obj){
                console.warn(`缺少引用对象 action:${this.name}, ref:${k}`);
            }else{
                let reg = k.split("/");
                let rname = reg[reg.length-1];
                this._refs[rname] = obj;
            }
        });
        this.name = ops.name;
    }
    set status(v:string){
        this.director.updateStatus(this.name,v, this._status);
        this._status = v;
    }

    get status(){
        return this._status;
    }

    getRef(name:string){
        return this._refs[name];
    }

    init(){

    }
    start(){
        
    }

    reset(){

    }
}

export {BaseAction}





