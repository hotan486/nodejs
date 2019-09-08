const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const static = require('serve-static');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

// port 속성 저장
app.set('port', process.env.PORT || 3000);
// view engine 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// static 미들웨어 : 공개폴더 설정
app.use('/public', static(path.join(__dirname, 'public')));
// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var db;
function dbConnection() {
    var dbUrl = 'mongodb://localhost';
    MongoClient.connect(dbUrl, function(err, client) {
        if(err) throw err;

        // mongodb 모듈 3.x버전 : db를 호출을 별도로 해준다.
        db = client.db('vehicle');

        console.log('mongodb 연결 성공: %d', dbUrl);
    });
} // end of dbConnection

var authUser = function(database, loginData, callback) {
    console.log('loginData : ' + loginData);
}

router.route('/process/login').post(function(req, res) {
    console.log('/process/login 요청 됨.');
    var loginData = {
        id: req.body.id,
        password: req.body.password
    }
    
    console.log(loginData);
    
    authUser(db, loginData, function(err, docs) {
        
    });
    
    res.end(loginData.paramId+", "+loginData.paramPwd);
});

// 라우터 미들웨어는 서버 실행 전에 설정.
app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('http://localhost:%d', app.get('port'));
    // 서버 실행 직후 바로 db를 connection 한다.
    dbConnection();
});





