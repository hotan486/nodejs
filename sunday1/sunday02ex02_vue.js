
//sunday02ex01_vue.js
const http = require('http');
const express = require('express');
const app = express();
//라우터 미들웨어 불러오기
const router = express.Router();
const path = require('path');

// ejs 모듈 설치
// > npm install ejs --save
// ejs 뷰엔진 등록
app.set('views', path.join(__dirname, 'views')); //접두어
app.set('view engine', 'ejs'); //접미어 (확장자)

app.set('port', 3000);

//라우팅 패스 설정 - url 주소 요청을 라우터를 이용해서 분기 시킨다.
router.route('/').get(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    res.end('/ 요청 들어옴');
});

router.route('/home').get(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    //res.end('/home 요청 들어옴');
    //ejs 렌더링 후 결과 html을 end()에 사용한다 
    let data = {
        'title':"홈페이지",
        'name':"길순이"
    }
    req.app.render('home', {'data':data}, function(err,html){
        if(err) throw err;
        res.end(html);
    });
});


//라우터 미들웨어 등록하기
//server 위에 패스 아래 선언
app.use('/', router);

const server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log('http://127.0.0.1:3000');
});

