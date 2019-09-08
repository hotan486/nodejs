
var mongojs = require('mongojs');

// 디비명 (디비명 , [컬렉션 명] )
var db = mongojs('vehicle',['car']);

// mongodb 모듈 중에 가장 간단한 모듈이다 
db.car.find(function(err, data){
    console.log(data);
    //포로세서 종료
    process.exit();
});