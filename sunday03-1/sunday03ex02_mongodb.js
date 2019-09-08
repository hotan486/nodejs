// sunday03ex02_mongodb.js
var MongoClient = require('mongodb').MongoClient;

// npm i -S 와 npm install --save 같다.
// -S => --save
// -D => --save-dev
// i => install
// npm install mongodb@버전 --save
// mongodb 모듈 2.x버전: url에 db명을 포함
// var dbUrl = 'mongodb://localhost/vehicle';
var dbUrl = 'mongodb://localhost';
MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
    if(err) throw err;
    
    // mongodb 모듈 3.x버전 : db를 호출을 별도로 해준다.
    var db = client.db('vehicle');
    
    // db객체를 통한 검색
    db.collection('car').findOne({}, function(findErr, result){
        if(findErr) throw findErr;
        console.log(result.name, result.company);
        client.close();
    });
});