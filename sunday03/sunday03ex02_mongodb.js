
var MongoClient = require('mongodb').MongoClient;

// npm i -S
// -S --save
// -D --save-dev
// npm install mongodb@버전 --save

//mongodb 모듈 2.x 버전 : url에 db명을 포함
//var dbUrl = 'mongodb://localhost/vehicle';
var dbUrl = 'mongodb://localhost';
MongoClient.connect(dbUrl, function(err, client){
    
    if(err) throw err;
    
    // db를 호출을 별도로 해준다.
    var db = client.db('vehicle');
    
    db.collection('car').findOne({}, function(findErr, result){
         if(err) throw err;
        console.log(result.name);
        client.close();
    });   
});