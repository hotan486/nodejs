
//sunday02ex01_express.js
const http = require('http');
const express = require('express');
const app = express();
//라우터 미들웨어 불러오기
const router = express.Router();

app.set('port', 3000);

//라우팅 패스 설정 - url 주소 요청을 라우터를 이용해서 분기 시킨다.
router.route('/').get(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    res.end('/ 요청 들어옴');
});

router.route('/home').get(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    res.end('/home 요청 들어옴');
});


//라우터 미들웨어 등록하기
//server 위에 패스 아래 선언
app.use('/', router);

const server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log('http://127.0.0.1:3000');
});

