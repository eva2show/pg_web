import {  serialization } from "@/core/serialization";

// 对象池,元素对象复用.
// 需要处理层级关系,一般御用多层.
type code = string|number;

class Pool {

    // json 通过json实例化对象.
    // 
    public objects:Map<code,any> = new Map;
    
    // 
    public cache:Map<code,any[]> = new Map;

    ctx:any = null;

    
    constructor(ctx:any) {
        this.ctx = ctx;
    }

    // 添加对象, num 初始化数量.
    add( name:code, json:any, container:any,  num: number = 1 ) {
        this.objects.set(name,{
            container,
            json
        });
        let list:[] ;
        if(!this.cache.has(name)){
            this.cache.set(name,list=[]);
        }else{
            list = this.cache.get(name);
        }
        
        for(let i=0,l=num;i<l;i++){
            let obj = serialization.fromJSON(json,this.ctx);
            if(obj){
                obj.visible = false;
                obj.label = name;
                obj._use = false;
                list?.push(obj);
                container.addChild(obj);
            }
        }

    }   

    //借一个对象,如果没有则创建.
    get(name: code) {
        let list = this.cache.get(name);
        if(!list)return;
        for(let o of list){
            if(o._use===false){
                o.visible = true;
                o._use = true;
                return o
            }
        }
        //如果没有返回，说明池子，没有对象。
        let ops = this.objects.get(name);
        if(!ops)return;

        let obj = serialization.fromJSON(ops.json,this.ctx);
        if(obj){
            obj.label = name;
            obj._use = true;
            list?.push(obj);
            ops.container.addChild(obj);
            console.log("对象池====新建对象",name,list.length);
            return obj
        }

    }

    //归还
    reset( target:any ) {
        let name = target.label;
        let list ;
        if(list = this.cache.get(name)){
            if(list.includes(target)){
                target.visible = false;
                target._use = false;
            }
        }
    }

    destroy(name:string){
        let list = this.cache.get(name);
        if(!list)return;
        list.forEach(o=>{
            o.destroy();
        });
    }

}

export {Pool}
