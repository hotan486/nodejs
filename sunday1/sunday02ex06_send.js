//sunday02ex06_send.js
const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();

app.set('port', process.env.PORT || 3000);

app.use('/', router);

router.route('/').get(function(req, res){
    console.log('/ 요청 됨');
    //res.writeHead(200, {'Content-Type':'text/html;charset=utf8;'});
    res.send({name:"sdf", age:20});
});



const server = http.createServer(app);
server.listen(3000, function(){
    console.log('http://localhost:%d', 3000);
});

