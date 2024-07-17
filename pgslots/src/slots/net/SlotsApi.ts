import type { Config } from "./Config.ts";
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';
import ECB from 'crypto-js/mode-ecb';
import pkcs7 from 'crypto-js/pad-pkcs7';

export const HttpTimeOut = 12000; // 请求超时时间 12s
export const RetryCount = 20; // 重试次数
export const RetryTime = 3000; // 重试间隔

type fetchOption = {

    //重试间隔时间 ms, 默认 RetryTime = 3000;
    retryTime?:number;

    //重试次数    默认 RetryCount = 20  
    retry?:number;

    //超时时间 ms 默认 HttpTimeOut = 12000; 
    timeout?:number;

    //结果是否解析为json  默认 json = true
    json?:boolean;
    method:"POST"|"GET";

    //重试回调 如果触发重试,会执行该回调.
    onRetry?:()=>void;
};

class SlotsApi {

    //默认超时
    static _timeout = 10000;

    //默认重试间隔
    static _retry_time = 5000;

    //默认重试次数
    static _retry = 6;

    urls: string[] = [];
    remoteUrls: string[] = [];
    decrypt_key: string = "";

    //当前请求的api
    curApi: string = "";

    gameId: number = 0 ;
    token: string = "" ;

   
    //当前赢奖金额
    win = 0 ;   

    //当前下注金额
    amount=0;

    //当前的余额
    balance = 0 ;

    freeNum = 0;
    totalAmount = 0;

    winCards:number[][] = [];
    lasetCards:number[][] = [];

    member = "" ;
    nickName = "" ;

    panels={
         //增加的可选值。
            addMutiple:[],
            //基础投注，默认20
            baseMultiple:[],
            //投注大小，面板第一列
            betMoney:[],
            //投注倍数
            multiple:[]
    };

    betMoney=0;
    multiple=0;
    baseMultiple=0;

    review = 0;

    constructor(conf: Config) {

        const { remoteConfig, gameid, decrypt_key } = conf;
        //线路
        this.remoteUrls = remoteConfig;
        this.decrypt_key = decrypt_key;
        this.gameId = gameid;

    }
    setPanel(ops:any){


    }

    getPanel(){
        

    }

    getData(k:string){
        return this[k]
    }

    async init(config:any){

        let err, data; 
        this.setToken(config);
        
        [err, data] = await this.updateRemoteUrl(0);
        
        console.log(`获取远程配置-[${!err?"成功":"失败"}]`, data);  

        [err, data] = await this.login();

        console.log(`登陆-[${data.code===0?"成功":"失败"}]`, data);  

        [err, data]  = await this.betPanel();
        console.log(`获取面板-[${data.code===0?"成功":"失败"}]`, data); 

    }

    async login() {

        let [err, data] = await this.fetch("/api/member/login");

        if(data.code === 0){
            this.token = data.data.token;
            this.balance = data.data.balance;
            this.member = data.data.member;
            this.nickName = data.data.nickName;
            this.gameId = data.data.gameId;
        }else{
            console.error("用户登陆失败！");
        }

        return [err, data]
    }



    async betPanel() {

        let [err, data] = await this.fetch("/api/game/betPanel", {
            gameId: this.gameId,
            userId: 1
        });

        if(data.code === 0){
            this.panels.addMutiple = data.data.addMutiple;
            this.panels.baseMultiple = data.data.baseMultiple;
            this.panels.betMoney = data.data.betMoney;
            this.panels.multiple = data.data.multiple;
        }else{
            console.error("用户登陆失败！");
        }
        return [err, data]
        
    }

    async betorder() {

        let [err, data] = await this.fetch("/api/game/betorder", {
            gameId: this.gameId,
            baseMoney: this.betMoney,
            multiple: this.multiple,
            review: this.review
        });

        return [err, data]
    }

    setToken(data: any) {

        if (data.code !== 0) return;
        let url = data.data.launchUrl;

        let temp = url.split("?");
        if (temp.length <= 1) {
            return;
        }
        let params = temp[1];
        let param_arr = params.split('&');
        if (param_arr.length <= 1) {
            return;
        }
        // 获取token
        let token = param_arr[1].split("token=");
        if (token[1]) {
            this.token = token[1];
        }

        // 获取gameid
        let gameid = param_arr[0].split("gameId=");
        if (gameid[1]) {
            this.gameId = Number(gameid[1]);
        }

        // console.log("setToken-token:", this.token)
        // console.log("setToken-gameid:", this.gameid)

        return {
            token: this.token,
            gameId: this.gameId
        }
        // this.token = conf.token;
        // this.gameid = conf.gameid;
    }

    decrypt(str: string) {

        try {
            let key = enc.parse(this.decrypt_key);
            let decrypted = AES.decrypt(str, key, {
                mode: ECB,
                padding: pkcs7
            });
            return decrypted.toString(enc);
        } catch (e) {
            return null
        }

    }

    setRemoteUrl(urls: string[]) {
        
        this.urls = urls;
        this.curApi = urls[0];
        console.log("setRemoteUrl:",this.curApi,urls);
        // console.log("setRemoteUrl", urls);
        if (urls.length === 0) {
            return ["配置错误,请求地址为空"];
        }
        return [null, urls]

    }

    //更新请求地址.
    async updateRemoteUrl(idx = 0) {

        // console.log("updateRemoteUr-1",idx);

        let url = this.remoteUrls[idx];
        if (!url) {
            return ["远程配置请求失败"]
        }
        let err, data: any;

        // console.log("updateRemoteUr-2",url);


        [err, data] = await this.fetch(url,null,{
            method:"GET",
            retry:1
        });

        // if (err) return await this.updateRemoteUrl(idx + 1);

        if (err) {
            // console.log("updateRemoteUr-err",err);
            
            return await this.updateRemoteUrl(idx + 1);
        } else {

            try {
                // console.log("updateRemoteUr-3",data);
                data = JSON.parse(this.decrypt(data));

                if (!data) {
                    return await this.updateRemoteUrl(idx + 1);
                } else {
                    return this.setRemoteUrl(data.api);
                }

            } catch (e) {
                return ["远程配置数据错误:" + e.toString()]
            }


        }

    }

    
    async _fetch(url: string, req: any) {

        // console.log("=====_fetch-1",url);
        return await fetch(url, req).then(async res => {
            let d, t;
            if (res.status !== 200) {
                return [res.status]
            }

            t = await res.text();

        // console.log("=====_fetch-2",t);

            try {
                if (req.json !== false) {
                    d = JSON.parse(t);
                } else {
                    d = t
                }
            } catch (e) {
                d = t
            }
            return [null, d];
        }).catch(e => {
            return [e]
        });

    }

    async fetch(url:string, data:any={}, ops?:fetchOption) {

        url = `${this.curApi}${url}`;

        console.log("===fetch-1",url,data);

        ops = ops || {
            method: "POST"
        };
        data = data || {};
        data.token = this.token;
        if (typeof ops.retry !== 'number') { ops.retry = RetryCount; };
        if (typeof ops.retryTime !== 'number') { ops.retryTime = RetryTime; };
        if (typeof ops.timeout !== 'number') { ops.timeout = HttpTimeOut; };
        
        ops.retry = Math.max(1,ops.retry);

        //默认解析为json
        if (ops.json === undefined) { ops.json = true; };
        if (ops.method === undefined) { ops.method = "POST" };

        let req =  ops.method==="GET"?{}: {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "X-token": this.token
            },
            body: JSON.stringify(data)
        };

        let err:any, rel:any;

        // console.log("===fetch-2",req);


        for (let i = 1, l = ops.retry+1; i < l; i++) {

            [err, rel] = await this._timeout(ops.timeout, this._fetch(url, req))
            if (!err) break;
            if (typeof ops.onRetry === 'function') {
                //如果有重试回调,调用.
                ops.onRetry(i, err);
            }

            await this.sleep(ops.retryTime);
        }

        return [err, rel];

    }

    sleep(t:number){
        return new Promise(res=>setTimeout(res,t))
    }
    _timeout(ms: number, promise) {
        return new Promise((resolve) => {
            const timer = setTimeout(() => {
                resolve(['TIMEOUT'])
            }, ms)
            promise
                .then(value => {
                    clearTimeout(timer)
                    resolve(value)
                })
                .catch(reason => {
                    clearTimeout(timer)
                    resolve([reason])
                });
        })
    }


}

export { SlotsApi }