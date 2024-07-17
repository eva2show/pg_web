
//元素编码 大于0的整数.
type Code = number;
// 10005  205  30008 
// 最高位的数字代表格子数。
// 小于1000的格子数取1,大于1000，取最高位。



//元素地图,二维数组, 空位置用-1代替
type SlotsMap<Code> = [][];

//测试结果
type Test = {

    //是否命中该规则
    hit:boolean;

    //如果是夸格子的，原始格子在这里找。
    //如果命中,需要返回命中的SlotsMap 空位置填充 -1
    target?:SlotsMap;

    //每一列命中个数,
    counts?:number[];

    //总命中个数
    count?:number;

    // 原始code
    code:Code;

    //如果不存在跨格，base = code
    //用于解析跨格元素的基础元素，也就是单个格子。
    base:Code;

    //包含的元素
    include?:Code[];

    //排除的元素，一般用不到，预留
    exclude?:Code[];

    // 线 、 适用way  、 megaways（way跨格）、
    type:string;
    
};

type BCode = {
    base:Code,
    size:number
};

declare interface Rule {
    // map 传入的地图
    // include 参与判断的元素 ,例如:判断是否命中元素A,包含百搭, 该值为 include = [A,百搭],
    // 即百搭和A的数量大于3.
    // exclude 不参与判断的元素,例如:夺宝不参与此规则判断

    test(map:SlotsMap,include:Code[],exclude:Code[]):Test;


    //需要根据地图大小生成一个该规则的地图.
    // map 是传入的地图大小,只有 为 -1,是可填充的,其余不为1的原样输出.
    // Rule 不能和其他规则冲突,要保证生成的不命中其他规则.
    // items参与生成的 元素列表,取随机值.

    generate(map:SlotsMap,rules:Rule[],items:Code[]):SlotsMap;
    
};

// 例如: 赏金女王