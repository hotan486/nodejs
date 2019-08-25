var http = require('http');

var server = http.createServer();
server.listen(3000, function(){
    console.log('http://localhost:%d',3000);
});


server.on('connection',function(socket){
    console.log('connection......');
});

server.on('request',function(req, res){
    res.end('Reuest...');
    console.log('request......');
});

server.on('close',function(){
    console.log('close......');
    server.close();
});












