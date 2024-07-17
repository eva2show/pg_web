
import { Pool } from './pool.js';
import type { BaseAction } from './action.js';
// import  { UserState } from './userState.js';
import  { Eventemitter } from 'glslots';

// 触发方式? 直接触发, 结束后是否触发下一个action?
// 信号触发, 等待一个信号,信号返回一个结果,触发, 信号是否会无法被触发?,信号等待中,被再次触发
// 信号触发,包括上一个结束后,触发该动作


// class Signal {
//     constructor() {
//         this._resolve = null;
//         this._reject = null;
//         this._await = null;
//     }
//     await() {
//         return this._await = new Promise((res, rej) => {
//             this._resolve = res;
//             this._reject = rej;
//         });
//     }
//     emit(data) {
//         this._resolve(data);
//     }
//     cannel(e) {
//         this._reject(e);
//     }
// }

// 用户信息
// 策略的变量信息，可以被保存到裤。
// strategy( user, var, conf){
    // var.set();
    // var.get();
    // user 只读，任何修改，不会被保存。
    //  config，可以任意修改。
    //  config.get(k);
    //  config.set(k,v);
    // return conf
// }


class Director extends Eventemitter {
    
    static TIMEOUT = 10000;
    public pool:Pool;
    public api:Record<string,(ops:any)=>any >= {};
    public actions:Map<string,BaseAction> = new Map;
    
    //所有的对象列表? 是否直接操作,还是必须由action操作.
    public objects:Map<string,any> = new Map;

    public assets:any;
    
    actionLock = false;
    ctx:any;

    // state = new UserState;

    _data:Record<string,any> = {};

    _updates:((d:any)=>void)[]=[];

    constructor(ctx:any) {
        super();
        this.pool = new Pool(ctx);
        this.ctx = ctx;
        this.actions;
    }

    //交互时执行，可以通过锁定，禁止在某些时候不可以被其他交互触发。
    //执行行动
    runAction( name:string,data:any,isLock:boolean){
       
        let action = this.getAction(name);

        action && action.start(data);
        
    }

    initActions(actions:any){

        for(let k in actions){

            let action = new actions[k].default({director:this});
            action.init();
            if(typeof action.update==='function'){
                this._updates.push(action);
            }
            this.addAction(action);
            // console.log(actions[k].default)
        }

    }

    addAction(action:BaseAction){
        this.actions.set(action.name,action);
    }

    getAction(name:string){

       return this.actions.get(name);

    }
    getData(name:string){
        return this._data[name];
    }
    setData(name:string,data:any){
        this._data[name]=data;
    }

    update(d:any){
        this._updates.forEach(a=>{a.update(d)});
    }

    init(){

        // actions = [
        //     {
        //         name:"hello",
        //         refs:["lunbo_1"],
        //         option:{
        //             haha:10,
        //         },
        //         cls:Cls
        //     }
        // ];

        // actions.forEach(a=>{
        //     let action = new a.Cls({
        //         name:a.name,
        //         director:this,
        //         refs:a.refs
        //     });
        //     action.init(a.option);
        // });

        return this

    }

    lock(){


    }
    sleep(t:number){
        return new Promise(res=>setTimeout(res,t));
    }

    //状态机制
    updateStatus(name:string, newStatus:string, oldStatus:string ){
        this.emit(`s:${name}:${newStatus}`,oldStatus);
    }

    //等待状态变化到谋个值
    waitStatus(name:string, status:string, ops={}){
        return new Promise((res,rej)=>{
            let tid = setTimeout(()=>{
                rej("timeout");
            },ops.timeout||Director.TIMEOUT);

            this.once(`s:${name}:${status}`,d=>{
                clearInterval(tid);
                res(d);
            });
        });
    }

}


export { Director }

