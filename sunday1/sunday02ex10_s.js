//sunday02ex06_send.js
const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const static = require('serve-static');
const cors = require('cors');

// cookieParser 모듈 설치
const cookieParser = require('cookie-parser');

const expressSession = require('express-session');

app.use('/public', static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
app.set("views", path.join(__dirname, 'views'));
app.set('view engine','ejs');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

router.route('/process/login').post(function(req, res){
    console.log('/process/login');
    //req.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    var paramId = req.body.userid;
    var paramPassword = req.body.userpassword;
    
    if(req.session.user){
        console.log('이미 로그인 되어 상품 페이지로 이동합니다.');
        res.redirect('process/product');
    }else{
        req.session.user = {
            id : paramId,
            name : '홍길동',
            authorized : true
        };
    }
    
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    res.write('<h1>로그인 성공</h1>');
    res.write('<p><a href="/process/product">상품페이지</a></p>');
    res.write('<p><a href="/process/logout">로그아웃</a></p>');
    
    res.end('process/login'+ ", id=" +paramId + ", password=" + paramPassword);
    
    //console.log('/process/login'+ ", id=" +id + "password=" + password);
    
    
});

router.route('/process/logout').get(function(req, res){
    console.log('/process/logout');
    if(req.session.user){
        req.session.destroy(function(err){
            if(err) throw err;
            console.log('로그아웃 성공');
            res.redirect('/public/login.html');
        });
    }else{
        console.log('아직 로그아웃 상태 입니다.');
        res.redirect('/public/login.html');
    }
    

    //res.end('process/logout');
    
});
router.route('/process/product').get(function(req, res){
    console.log('/process/product');
    
    if(req.session.user){
        
        req.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
        res.write('product page');
        res.write('<p><a href="/process/logout">로그아웃</a></p>');
        res.end();
    }else{
      
        console.log('아직 로그아웃 상태 입니다.');
        res.redirect('public/login.html');
    }

    //res.end('process/product');
    
});



router.route('/').get(function(req, res){
    console.log('/ 요청 됨');
    //res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    //res.send({name:"sdf", age:20});
    
    //res.redirect('http://naver.com');
    
    //res.end("<h1>Hello</h1>");
    
    req.app.render('index', {}, function(err,html){
        if(err) throw err;
        res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
        res.end(html);
    });
});

app.use('/', router);

// 다른 모든 라우팅 패스 설정 아래에 설정해야 한다.
//app.all('*', function(req,res){
//    res.status(404).send('<h1> 404 ERROR - 페이지를 찾을 수 없습니다. </h1>');
//});
const expressErrorHandler = require('express-error-handler');
const errorHandler = expressErrorHandler({
    static : {
        '404': __dirname+'/public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

const server = http.createServer(app);
server.listen(3000, function(){
    console.log('http://localhost:%d', 3000);
});

