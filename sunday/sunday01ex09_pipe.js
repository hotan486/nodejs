var fs = require('fs');

var inname = 'D:/nodejs_msa/nodejs/sunday/output.txt';

var outname = __dirname + '/output2.txt';

fs.exists(outname, function(exists){
    if(exists){
        fs.unlink(outname, function(err){
            if(err) throw err;
            console.log('기존 파일 삭제');
        });
    }
    var infile = fs.createReadStream(inname, {flags:'r'});
    var outfile = fs.createWriteStream(outname, {flags:'w'});
    infile.pipe(outfile);
                                     
    
});