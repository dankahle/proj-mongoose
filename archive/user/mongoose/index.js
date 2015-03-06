
var express = require('express'),
	bodyParser = require('body-parser'),
	userRepo = require('./userRepo')
	app = express();

userRepo.init();

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());

app.use('*', function(req, res, next) {
	console.log(req.method, req.baseUrl);
	next()
})


app.get('/api/user', function(req, res) {
	userRepo.get(function(err, docs) {
		if (err)
			return res.status(500).send(err.message);
		res.send(docs);
	});
});

app.get('/api/user/:id', function(req, res) {
	userRepo.getOne(req.params.id, function(err, doc) {
		if (err)
			return res.status(500).send(err.message);
		res.send(doc);
	})
});

app.post('/api/user', function(req, res) {
	userRepo.insert(req.body, function(err, doc) {
		if (err)
			return res.status(500).send(err.message);
		res.send(doc);
	});
});

app.put('/api/user', function(req, res) {
	userRepo.update(req.body, function(err, doc) {
		if (err)
			return res.status(500).send(err.message);
		res.send(doc);
	});
});

app.delete('/api/user/:id', function(req, res) {
	userRepo.remove(req.params.id, function(err, doc) {
		if (err)
			return res.status(500).send(err.message);
		res.send(doc);
	})
});

app.listen(3000, function(){console.log('listening on 3000')});

