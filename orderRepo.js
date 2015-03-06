	var db = require('./orderDb')
	_ = require('lodash');

function get(cb) {
	return db.Order.find().sort({date:-1}).populate('cust').lean().exec(cb);
}

function getOne(id, cb) {
	return db.Order.findById(id).populate('cust').lean().exec(cb);
}

function insert(doc, cb) {
	var order = new db.Order(doc);
	order.save(function(err, newDoc) {
		pullOutErrMsg(err)
		cb(err, newDoc);
	});
}
	function pullOutErrMsg(err) {
		if(err.errors) {
			var message = '';
			for(prop in err.errors)
				message += err.errors[prop].message + '\n';
			err.message = message;
		}
	}

function update(order, cb) {
	db.Order.findById(order._id, function(err, doc) {
		if(err) return cb(err);
		if(!doc) return cb(new Error('Not found'));
		['_id', '__v'].forEach(function(prop) {
			delete order[prop];
		})
		_.extend(doc, order) //dank: does this update all?
		doc.save(function(err, doc) {
			pullOutErrMsg(err)
			cb(err, doc);
		});
	})
}

function remove(id, cb) {
	db.Order.findById(id, function(err, doc) {
		if(err) return cb(err);
		if(!doc) return cb(new Error('Not found'));
		doc.remove(cb);
	})
}

function getCusts(cb) {
	return Cust.find().lean().exec(cb);
}

function getItems(cb) {
	return Item.find().lean().exec(cb);
}


module.exports = exports = {
	get: get,
	getOne: getOne,
	insert: insert,
	update: update,
	remove: remove,
	getCusts: getCusts,
	getItems: getItems
}

