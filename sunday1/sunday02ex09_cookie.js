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



app.use('/public', static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
app.set("views", path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use('/', router);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


router.route('/process/showCookie').get(function(req, res){
    console.log('/process/showCookie');
    //쿠키 보여주기

    res.send(req.cookies);
    
});

router.route('/process/setCookie').get(function(req, res){
    console.log('/process/setCookie');
    //쿠키설정
    res.cookie('user',{
        id:'shim',
        name:'방탄소년단',
        authorized:true
    });
    
    console.log(user);
    res.redirect('/process/showCookie');
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

