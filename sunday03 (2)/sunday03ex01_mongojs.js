// sunday03ex01_mongojs.js
var mongojs = require('mongojs');

// mongojs(db명, [컬렉션명]);
var db = mongojs('vehicle', ['car']);

// mongodb 관련 모듈 중 가장 간단한 모듈이 mongojs모듈
db.car.find(function (err, data) {
    console.log(data);
    
    process.exit(); // 프로세스 강제 종료
});
