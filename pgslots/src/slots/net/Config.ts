// 平台

export enum GamePlatform {
    cg = 1,
    pg,
}

// 远程配置
let remoteConfig = {
    // 开发
    dev: ["https://line.ligomi.com/dev-dianzi/config.json"],

    // 测试
    test: ["https://line.ligomi.com/test-dianzi/wanjia/config.json",
        "https://line.xxfhjgj.com/test-dianzi/wanjia/config.json"],

    // 正式
    out: ["https://line.ligomi.com/pro-dianzi/front/config.json",
        "https://line.newkfz.xyz/pro-dianzi/front/config.json",
        "https://line.xxfhjgj.com/pro-dianzi/front/config.json",
        "https://line.omyax.com/proeg/front/config.json"],

    // NG正式
    outng: ["https://line.ligomi.com/pro-newdianzi/front/config.json",
        "https://line.xxfhjgj.com/pro-newdianzi/front/config.json",
        "https://line.omyax.com/newproeg/front/config.json"],

    // 对外正式
    outgo: ["https://line.ligomi.com/pro-outdianzi/front/config.json",
        "https://line.xxfhjgj.com/pro-outdianzi/front/config.json",
        "https://line.omyax.com/outproeg/front/config.json"],

    // 混合正式
    outmix: ["https://line.ligomi.com/pro-hunhedianzi/front/config.json",
        "https://line.xxfhjgj.com/pro-hunhedianzi/front/config.json",
        "https://line.omyax.com/hunheproeg/front/config.json"],
}

export class Config {
    token = "BId9BZuIiNbjiCvNHUrPvPmO/hNxHh+NrSunLh4dQ3uB437rVQ1Dbo67r56wQVMunhVNedURW4FWVTHTnDicjQt01St5M/8kdMCuPCP/qZqr2r+6rinnnCS+0NcBa3oHPEnLMdSbPCj99Q9oo2GEye034uGNRZQNsTlGtZVhUt/lrmHsG9KGweY3kw33ni3rkOmnaPEvAAdU3EPcENKqsIdIZ0fbFBMLM6nWUdk8ZfY=";
    gameid = 8895; // 当前gamei
    decrypt_key = "96ac58d7a2efba1f416d2489f9bde583"; // 解密秘钥

    // 远程配置
    remoteConfig = remoteConfig.dev;

    apiUrls = []; // 远程配置的api接口保存 
    wsUrls = []; // 远程配置的 ws地址保存
    curApi = ""; // 当前使用的 接口地址
    curWs = ""; // 当前使用的 ws地址
    // curApi = "https://api.z13a70.com";
    // curWs = "wss://ws.z13a70.com";

    mode = "debug";//release|debug // 发布模式
    unit = "￥"; // 金币单位

    //不需要每次都使用postmain
    testAccount = {
        url:"https://devmapi.z13a70.com/v1/game/launch",
        body:{"merchant": "Jack23","member": "test6666","gameId": 8892,"timestamp": 1,"password": "123456"},
        sign:"de7383c1f70a0bede1129860c239c98a"
    }

    // 平台
    platform = GamePlatform.cg;

    // 游戏
    games = {
        // 麻将胡了
        "8888": {
            bundle: "MJHL",
            main: "prefab/MJHL_loading",
        },
        // 麻将胡了2
        "8889": {
            bundle: "MJHL2",
            main: "prefab/MJHL2_loading",
        },
        // 赏金女王
        "8890": {
            bundle: "SJNW",
            main: "prefab/SJNW_loading",
        },
        // 赏金大对决
        "8891": {
            bundle: "SJDDJ",
            main: "prefab/SJDDJ_loading",
        },
        // 夜醉佳人
        "8892": {
            bundle: "YZJR",
            main: "prefab/YZJR_loading",
        },
        // 斗鸡
        "8893": {
            bundle: "DJ",
            main: "prefab/DJ_loading",
        },
        //加拿大28
        "8895": {
            bundle: "JND28",
            main: "prefab/JND28_loading",
        },
        //庆余年
        "8896": {
            bundle: "QYN",
            main: "prefab/QYN_loading",
        },
        //庆余年Z
        "8897": {
            bundle: "QYNZ",
            main: "prefab/QYNZ_loading",
        },
    }

    // 通用界面
    layer = {
        balance: "prefab/Balance",  // 余额
        rule: "prefab/Rule", // 规则
        odds: "prefab/Odds", // 赔付表
        auto: "prefab/AutoSet", // 自动旋转
        bet_custom: "prefab/BetCustom", // 投注自定义
        bet_record: "prefab/BetRecord", // 投注记录
        bet_detail: "prefab/BetDetail", // 投注详情
        back_game: "prefab/BackGame", // 安全退出 回到游戏
        quit_game: "prefab/QuitGame", // 退出游戏
        connect: "prefab/Connect", // 连接界面
        req_fail: "prefab/RequestFail", // 请求失败
        req_fail_gold: "prefab/RequestFailGold", // 请求失败 金币不足
        req_limit: "prefab/AreaLimitBox", // IP请求限制 加载页
        req_limitin: "prefab/AreaLimitInBox", // IP请求限制 游戏内
    }

    // 初始化
    init(url) {
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
            this.gameid = Number(gameid[1]);
        }
    }
}