
const gcf = function (a, b) {

    // return function () {
        if (b == 0) {
            return a;
        } else {
            return gcf(b, a % b);
        }
    // }();

};

//质数
const PRIME = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31 ];

// var int_1 = 18
// var int_2 = 12

// console.log(gcf(int_1, int_2));



// 以内质数   1 3 5 7 11 13 17 19 23
// 

// 求，因数， 如果因数不是1或自己，就在此求因数
// 一个数的约束集合。
// 

const range = ( s, e , fn ) => {
    for(let i = s;i<=e;i++){
        fn(i);
    }
};

//获取约数
function getFactor( num ){
    let fs = [1,num];
    range(1,num,n=>{
        if( !fs.includes(n) && (num % n ===0)){
                fs.push(n)
        }
    });
    return fs
}

// 列出一个数的执行个数相乘的所有可能性。
// len = 数量，max 是最大取值
function getAllFactor( num, max, len ){

    //  如果是质数，并且大于len，无解。
    if(PRIME.includes(num) && ( (num < len && num!==max)  || num > len )  ){
        throw "无解!";
    }

    //获取所有约数。
    let fs = getFactor(num);



}


range(1,20,n=>{

    console.log(`${n}:`,getFactor(n));


});

