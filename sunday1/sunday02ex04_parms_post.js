//sunday02ex03_profile.js
const http = require('http');
const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');

// serve-static 모듈
// > npm i serve-static --save
const static = require('serve-static');

// body-parser 모듈 post 방식의 전송 파라미터 받기 
// > npm i body-parser --save
const bodyParser = require('body-parser');

//get 방식 데이터 전송
app.use('/public', static(__dirname + '/public'));
//post 방식 데이터 전송
//app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// ejs 모듈 설치
// > npm install ejs --save
// ejs 뷰엔진 등록
app.set('views', path.join(__dirname, 'views')); //접두어
app.set('view engine', 'ejs'); //접미어 (확장자)


app.set('port',3000);

router.route('/').get(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    res.write('<h1>길동의 홈페이지</h1>');
    //GET
    //res.write('<p><a href="/public/public_from.html">프로필 입력으로 이동</p>');
    res.write('<p><a href="/public/public_from2.html">프로필 입력으로 이동</p>');
    //res.write('<p><a href="/profile">프로필로 이동</p>');
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

//get
//router.route('/profile').get(function(req, res){
//post    
router.route('/profile').post(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    
    //get
    //var name = req.query.name;
    //var yearWork = req.query.yearWork;
    //var yearSchool = req.query.yearSchool;
    //var yearJobSkill = req.query.yearJobSkill;
    
    //post
    var name = req.body.name;
    var yearWork = req.body.yearWork;
    var yearSchool = req.body.yearSchool;
    var yearJobSkill = req.body.yearJobSkill;
    
    console.log(name, yearWork, yearSchool, yearJobSkill);
    
    
    //res.end('/home 요청 들어옴');
    let data = {
        'name': name,
        'yearWork':yearWork,
        'yearSchool':yearSchool,
        'yearJobSkill':yearJobSkill
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