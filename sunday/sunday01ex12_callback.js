// 변수에 함수를 대입 할수 있다 .,


// 함수 선언 방법

function fn01(){
    console.log("fn01 함수 실행");
}

// 함수 호출

//fn01();

//자동실행
/*
(function(){
    console.log('괄호흫..');
})();
*/

//함수 선언방법2
var fn02 = function(){
    console.log('fn02 함수 실행!');
}
//fn02();


//기존에 함수 변수에 담기
//var fn03 = fn01;
//fn03();


function fno4(callback){
    if(typeof callback == 'Function'){
        callback();
    }
}

fno4(fn01);


/*fn04(function(data){
    console.log('새로만들면서 ');
    console.log();
});*/



















