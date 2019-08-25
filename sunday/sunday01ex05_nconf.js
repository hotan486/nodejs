var nconf = require('nconf');

nconf.env();

console.log('os 환경변수의 값: %s', nconf.get('OS'));