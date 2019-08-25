var http = require('http');
var express = require('express');

var app = express();

app.get('/home', function(req,res){
    res.end('this is home page');
});

app.get('/profile', function(req,res){
    res.end('this is profile page');
});



//생성
var server = http.createServer(app);
//포트
server.listen(3000, function(){
    console.log('http://localhost:%d',3000);
});











/*server.on('connection',function(socket){
    console.log('connection......');
});*/

/*
server.on('request',function(req, res){
    //res.end('<h1>Hello</h1>');
    //console.log('request......');
    res.writeHead(200,{'Content-Type':'text/html;charset=utf8;'});
    res.write('<html>');
    res.write('<head>');
    res.write('<title>하하하하</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>오신걸 환영합니다 .</h1>');
    res.write('</body>');
    res.write('</html>');
    
});
*/

/*
server.on('close',function(){
    console.log('close......');
    server.close();
});
*/












