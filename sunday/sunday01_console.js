// sunday01ex01_console.js

/*
console.log('Hello world');
console.log('Hello','world');

console.log('숫자 보여 주기 :%d', 10);
console.log('문자 보여주기 : %s', '기생충');

//console.log('json 보여주기 : %j', {"name":"gkgk"});

var name = "김길동";

console.log("Name => " + name);
console.log(`Name => ${name}`);

console.log('json 보여주기 :' +{"name":"gkgk"});
console.log('json 보여주기 : '+ JSON.stringify({"name":"gkgk"}));
*/


var result = 0;
console.time('time_check');

for(var i = 1 ; i < 10000; i++){
    
    result += i;
    
}

console.timeEnd('time_check');

console.log("result => ",result);

console.log("현재 실행 파일 명 : %s", __filename);
console.log("현재 실행 파일 패스 : %s", __dirname);
