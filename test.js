

var async = require('async'),
	fs = require('fs')


var i;

function test(val, cb) {
	cb(null, val*2);
}
var fcn = async.memoize(test);

for(var i = 0; i < 3; i++)
	fcn(i+1, function(val){return val*2});

console.log(fcn.memo)