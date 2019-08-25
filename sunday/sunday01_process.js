//console.log(process.argv.length);

//console.log(process.argv);


process.argv.forEach(
    function(item, index){
        console.log(index , ":",item);
        //if(index > 1){
        //    console.log(index , ":",item);
        //}
    }
);

console.log('os 환경변수 : ', process.env['os']);