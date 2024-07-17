
export let HttpState = {
    error: "网络错误",
    timeover: "请求超时",
    fail: "请求失败",
    success: "请求成功",
}

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


export class Http {

    request(url: string, data, method: string, success: Function, fail: Function, crypto = false) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = HttpTimeOut;
        //xhr.responseType = "json";
        console.log(`===============request(${method}-${crypto}):${url}`, data);

        console.log(url, method);
        xhr.onload = () => {
            if (xhr.status == 200) {
                let res = xhr.response;
                if (crypto) {
                    res = gHelper.decrypt(res);
                }
                let result = this.parse(res);
                success(result);
            }
            else {
                fail(HttpState.fail);
            }
        }
        xhr.onerror = () => {
            fail(HttpState.error);
        }
        xhr.ontimeout = (e) => {
            fail(HttpState.timeover);
        }
        xhr.open(method, url, true);

        if (method != "GET") {
            let requestHeader = {
                //"Content-Type": "application/x-www-form-urlencoded",
                //"Content-Type": "text/plain;charset=UTF-8",
                "Content-Type": "application/json;charset=UTF-8",
                "X-token": gConfig.token,
            }
            for (const key in requestHeader) {
                xhr.setRequestHeader(key, requestHeader[key]);
            }

        }
        xhr.send(JSON.stringify(data));
    }


/*
    async request(url: string, data, method: string, success: Function, fail: Function, crypto = false ) {

        let [err,res] = await this.fetch(url,data,{
            method,
            json:false
        });

        if(err){
            fail(HttpState.fail)
        }else{
            if (crypto) {
                res = gHelper.decrypt(res);
            }
            let result = this.parse(res);
            success(result)
        }

    }
*/

    async _fetch(url: string, req: any) {

        return await fetch(url, req).then(async res => {
            let d, t;
            if (res.status !== 200) {
                return [res.status]
            }

            t = await res.text();
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

    async fetch(url:string, data, ops:fetchOption) {


        if (typeof ops.retry !== 'number') { ops.retry = RetryCount; };
        if (typeof ops.retryTime !== 'number') { ops.retryTime = RetryTime; };
        if (typeof ops.timeout !== 'number') { ops.timeout = HttpTimeOut; };

        //默认解析为json
        if (ops.json === undefined) { ops.json = true; };
        if (ops.method === undefined) { ops.method = "POST" };

        let req =  ops.method==="GET"?{}: {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "X-token": gConfig.token
            },
            body: JSON.stringify(data)
        };

        let err:any, rel:any;

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

    private parse(str) {
        let type = typeof (str);
        if (type == 'string') {
            try {
                let obj = JSON.parse(str);
                if (typeof obj == 'object' && obj) {
                    return obj;
                }
                else {
                    return "";
                }
            }
            catch (e) {
                return "";
            }
        }
        else if (type == "object") {
            return str;
        }
        return "";
    }

    // 参数转换到请求的url上
    protected params2Url(url: string, params: Object): string {
        if (params == null || params == undefined) {
            return url;
        }
        let result = "&";
        if (url.indexOf("?") < 0) {
            result = "?";
        }
        let keys = Object.keys(params)
        for (let i = 0; i < keys.length; i++) {
            if (i == 0) {
                result += `${keys[i]}=${(<any>params)[keys[i]]}`;
            } else {
                result += `&${keys[i]}=${(<any>params)[keys[i]]}`
            }
        }

        result = url + result;
        return result;
    }
}