var http = require('http');
var express = require('express');
var app = express();




var server = http.createServer(app);

server.listen(3000, function(req,res){
    console.log('http://localhost:%d',3000);
})















