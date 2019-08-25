var http = require('http');
var fs = require('fs');


var server = http.createServer(function(req,res){
    
    console.log("요청 들어옴...");
    
    //res.end("<h1>Request.....</h1>");
    
    var instream = fs.createReadStream('./output.txt',{ encoding:'utf8'});
    //console.log(instream);
    instream.pipe(res);
    console.log(res);
});


server.listen(3000, function(){
    console.log("http://localhost:%d",3000);
});