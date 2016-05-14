var express = require('express'),
	bodyParser = require('body-parser'),
	orderRoute = require('./orderRoute')

var app = express();
console.log(__dirname + '/public')
app.use(express.static(__dirname + '/../public'))
app.use(bodyParser.json());

app.use('*', function(req, res, next) {
	//console.log(req.method, req.baseUrl);
	next()
})

app.use('/api/', orderRoute)

app.listen(3002, function(){console.log('listening on 3002')});


