
var express = require('express'),
	orderRepo = require('./orderRepo')

var router = express.Router();

router.get('/order', function(req, res) {
	orderRepo.get(function(err, docs) {
		if (err)
			return res.status(500).send(err.message);
		res.send(docs);
	});
});

router.get('/order/:id', function(req, res) {
	orderRepo.getOne(req.params.id, function(err, doc) {
		if (err)
			return res.status(500).send(err.message);
		res.send(doc);
	})
});

router.post('/order', function(req, res) {
	orderRepo.insert(req.body, function(err, doc) {
		if (err)
			return res.status(500).send(err.message);
		res.send(doc);
	});
});

router.put('/order', function(req, res) {
	orderRepo.update(req.body, function(err, doc) {
		if (err)
			return res.status(500).send(err.message);
		res.send(doc);
	});
});

router.delete('/order/:id', function(req, res) {
	orderRepo.remove(req.params.id, function(err, doc) {
		if (err)
			return res.status(500).send(err.message);
		res.send(doc);
	})
});

router.get('/cust', function(req, res) {
	orderRepo.getCusts(function(err, docs) {
		if (err)
			return res.status(500).send(err.message);
		res.send(docs);
	})
})

router.get('/item', function(req, res) {
	orderRepo.getItems(function(err, docs) {
		if (err)
			return res.status(500).send(err.message);
		res.send(docs);
	})
})

module.exports = exports = router;