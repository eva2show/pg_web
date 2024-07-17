import type {Code,SlotsMap,Test,BCode} "./rule.d.ts";
// Megaways Slots
// Megaways Slots 是在Way Slots 上发展衍生出的新玩法
// 其主要特征是在Way Slots 的基础上添加了大小不一的图标
// 线数 = 每列元素的个数相乘




function parseCode( code:Code ):BCode{
    if(code<1000){
        return {size:1,base:code}
    }else{
        let codeStr = String(code);
        return { size:Number(codeStr[0]), base: Number(codeStr.slice(1)) };
    }
}
function parseCodes( codes:Code[] ):BCode[]{
    return codes.map(code=>{
        return parseCode(code);
    });
}

let utils = {
   
    //megaways 规则判断，一次判断多个，避免循环多次code  ruleCount = 连续几个算命中规则，默认是3
    megawaysTests( map:SlotsMap, ruleCount:number=3, ie:{code:Code, include:Code[], exclude:Code[] }[] ):Test[] {

        let codeTests:Record<Code,Test> = {};

        ie.forEach( ({ code , include, exclude })=>{
            let bc = parseCode(code);
            codeTests[bc.base] = {
                hit:false,
                counts:[0],
                count:0,
                code:bc.base,
                base:bc.base,
                include,
                exclude
            };
        });

        //首列去重,并且判断首列的元素情况
        let fastCodes = map[0].forEach( (code:Code)=>{
            let bc = parseCode( code );
            let tes = codeTests[bc.base];
            if(!tes)return;
            tes.count++;
            tes.counts[0]++
        });
        
        fastCodes.forEach( (code:Code)=>{

            let bcode = parseCode(code);
            //如果不需要判断该规则，直接退出当前循环。
            let tes = codeTests[bcode.base];

            //如果没有该规则，或者该规则count=0，退出，count=0表示 第一列没有。
            if( !tes || !tes.count) return;

            for( let i = 1, l = map.length; i < l; i++) {

                //本列命中的数量。
                let reelCount = 0;
                for( let j = 0, k = map[i].length; j < k; j++ ){
                    let c = map[i][j];
                    //解析code，处理夸格子的不一致。
                    let bc = parseCode(c);
                    //如果包含，加1。
                    if( tes.include.includes(bc.base) ){
                        reelCount++;
                    }
                }
                if(reelCount>0){
                    tes.counts.push(reelCount);
                    tes.count += reelCount;
                }else{
                    //有一次没有命中，跳出循环。
                    break;
                }
            }

            //连续出现数数量
            if(tes.counts.length>=ruleCount){
                tes.hit = true;
            }
        });

        let rels = [];
        for(let k in codeTests){
            rels.push(codeTests[k]);
        }

        return rels
    },

    //检测某 一次判断多个 code出现的个数。
    testCount( map:SlotsMap, ie:{code:Code, include:Code[], exclude:Code[] }[]):Test[]{

        let codeTests:Record<Code,Test> = {};

        
        ie.forEach( ({ code , include, exclude })=>{
            let bc = parseCode(code);
            codeTests[bc.base] = {
                hit:false,
                counts:[],
                count:0,
                code:code,
                base:bc.base,
                include,
                exclude
            };
        });

        map.forEach( (reel:Code[],i:number)=>{
            reel.forEach( (code)=>{
                let bc = parseCode(code);
                let tes = codeTests[bc.base];
                if(!tes)return;
                if(tes.base===bc.base || tes.includes(bc.base)){
                    tes.counts[i] = tes.counts[i]?tes.counts[i]+1:1;
                    tes.count++;
                }
            });
        });

        let rels = [];
        for(let k in codeTests){
            rels.push(codeTests[k]);
        }
        return rels
    },

    // 生成 map 原始地图， 排它规则，生成出来，不能命中其他规则。
    // 倍数：3-？固定的谋一个值。
    // 包含的元素:[ 百搭 , 格子其他值 ]，百搭处理？
    // baseCode:
    // items参与生成的 空白的元素列表,取随机值？ 是否要控制 随机元素的概率
    megawaysGenerate(map:SlotsMap,rules:Rule[],items:Code[]){

        


    }
};
