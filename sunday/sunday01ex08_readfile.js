var fs1 = require('fs');

console.log("현재 실행 파일 명 : %s", __filename);
console.log("현재 실행 파일 패스 : %s", __dirname);


fs1.readFile('./README.md', 'utf8', function(err, data) {
    // 읽어 들인 데이터를 출력합니다.
    console.log(data);
});


