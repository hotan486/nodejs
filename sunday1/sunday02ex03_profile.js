//sunday02ex03_profile.js
const http = require('http');
const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');

// ejs 모듈 설치
// > npm install ejs --save
// ejs 뷰엔진 등록
app.set('views', path.join(__dirname, 'views')); //접두어
app.set('view engine', 'ejs'); //접미어 (확장자)


app.set('port',3000);

router.route('/').get(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    res.write('<h1>길동의 홈페이지</h1>');
    res.write('<p><a href="/profile">프로필로 이동</p>');
    res.write('<p><a href="/home">홈으로 이동</p>');
    //res.end('/ 요청 들어옴');
});

router.route('/home').get(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    //res.end('/home 요청 들어옴');
    let data = {
        'title':"홈페이지",
        'name':"길순이"
    }
    req.app.render('home', {'data':data}, function(err,html){
        if(err) throw err;
        res.end(html);
    });
});

router.route('/profile').get(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    //res.end('/home 요청 들어옴');
    let data = {
        'name': "홍길순",
        'yearWork':"si 업체 10년",
        'yearSchool':"서울대 컴퓨터공학과",
        'yearJobSkill':"정보처리기사"
    }
    req.app.render('profile', {'data':data}, function(err,html){
        if(err) throw err;
        res.end(html);
    });
});

app.use('/', router);

const server = http.createServer(app);

server.listen(app.get('port'), function(){
    console.log('http://127.0.0.1:3000');
});