var Calc = require('./sunday01ex07_event');

var calc = new Calc();

calc.emit('stop');

console.log(Calc.title + '에 전달 함');