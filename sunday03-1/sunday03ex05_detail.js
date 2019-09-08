const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const static = require('serve-static');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

// port 속성 저장
app.set('port', process.env.PORT || 3000);
// view engine 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static 미들웨어 : 공개폴더 설정
app.use('/public', static(path.join(__dirname, 'public')));
// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// session 미들웨어 설정
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

var db;

function dbConnection() {
    var dbUrl = 'mongodb://localhost';
    MongoClient.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {
        if (err) throw err;

        // mongodb 모듈 3.x버전 : db를 호출을 별도로 해준다.
        db = client.db('local');

        console.log('mongodb 연결 성공: %s', dbUrl);
    });
} // end of dbConnection

var authUser = function (database, loginData, callback) {
    //console.log('loginData : ' + loginData);
    // database에서 컬렉션 받아오기
    users = database.collection('users');
    users.find(loginData).toArray(function (err, docs) {
        if (err) {
            console.log('err 이다!');
            callback(err, null);
            return;
        }
        if (docs != undefined && Array.isArray(docs)) {
            if (docs != null && docs.length > 0) {
                console.log(docs[0]);
                callback(null, docs);
            } else {
                console.log('사용자가 없다!');
                callback(null, null);
            }
        } else {
            console.log('Array아니다.');
            callback(null, null);
        }
    });
} // end of authUser 

function carList(database, callback) {
    car = database.collection('car');
    
    car.find({}).toArray(function(err, list) {
        if(err) {
            console.log('car find error!');
            callback(err, null);
            return;
        }
        if(list != null && list.length > 0) {
            callback(null, list);
        } else {
            callback(null, null);
        }
    });
}

router.route('/process/product/:_id').get(function(req, res) {
    console.log('/process/product/:_id');
    var _id = req.params._id;
    
    console.log("_id : " + _id);
    
    res.end(_id);
});

router.route('/process/product').get(function(req, res) {
    console.log('/process/product 요청 됨!');
    
    if(req.session.user) {
        if(db) {
            carList(db, function(err, list) {
                //console.log(list);
                req.app.render('product', {carList : list}, function(err, html){
                    if(err) throw err;
                    res.end(html);
                });
            });
        }
    } else {
        console.log('로그인 안됨!');
        res.redirect('/public/login.html');
    }
});

router.route('/process/login').post(function (req, res) {
    console.log('/process/login 요청 됨.');
    var loginData = {
        id: req.body.id,
        password: req.body.password
    };

    console.log(loginData);
    if(db) {
        authUser(db, loginData, function (err, docs) {
            if(err) {
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                res.end('데이터베이스 에러 발생!');
                return;
            }
            if(docs != null && docs.length > 0) {
                // 세션에 로그인 정보 담기(cookie-parsere, express-session)
                req.session.user = {
                    loginData: docs[0].id,
                    name : docs[0].name,
                    authorized: true
                }
                // 상품 정보 페이지로 이동
                res.redirect('/process/product');
            } else {
                res.redirect('/public/login.html');
            }
        });
    } else {
        res.end('db 접속이 안되었습니다!');
    }
});

router.route('/process/logout').get(function (req, res) {
    console.log('/process/logout');
    if(req.session.user) {
        req.session.destroy(function(err) {
            if(err) throw err;
            console.log('세션을 삭제하고 로그아웃 성공!');
        });
    } else {
        console.log('아직 로그인 전!');
    }
    res.redirect('/public/login.html');
});

// 라우터 미들웨어는 서버 실행 전에 설정.
app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('http://localhost:%d', app.get('port'));
    // 서버 실행 직후 바로 db를 connection 한다.
    dbConnection();
});
