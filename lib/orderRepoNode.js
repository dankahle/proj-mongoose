	var mongodb = require('mongodb'),
		MongoClient = mongodb.MongoClient,
		ObjectId = mongodb.ObjectId,
		db = require('./orderDbNode'),
		_ = require('lodash'),
		async = require('async')


function populate(docs, prop, collection, callback) {

	if(docs instanceof Array) {
		async.each(docs, function(doc, cb) {
			collection.findOne({_id: ObjectId(doc[prop])}, function(err, propDoc) {
				if(err) return cb(err);
				doc[prop] = propDoc;
				cb()
			})
		}, function results(err) {
			callback(err, docs);
		})
	}
	else {
		var doc = docs;
		collection.findOne({_id: ObjectId(doc[prop])}, function(err, propDoc) {
			doc[prop] = propDoc;
			callback(err, doc);
		})
	}
}

function get(cb) {

	db.Orders.find().sort({date:-1}).toArray(function(err, orders) {
		populate(orders, 'cust', db.Custs, cb);
	});
}

function getOne(id, cb) {
	db.Orders.findOne({_id: ObjectId(id)}, function(err, order) {
		populate(order, 'cust', db.Custs, cb)
	});
};

function validateOrder(order) {
	var msg = '';
	order.items.forEach(function(v) {
		if(v.quantity > 5)
			msg +=  'item: ' + v.name + ' has a quantity > 5.\n';
	})
	return msg;
}

function insert(doc, cb) {
	var msg = validateOrder(doc);
	if(msg) return cb(new Error(msg));
	if(!doc.date) doc.date = new Date; // defaults
	db.Orders.insert(doc, cb);
}

function update(order, cb) {
	var msg = validateOrder(order);
	if(msg) return cb(new Error(msg));
	var id = order._id;
	delete order._id; // have to delete id otherwise it tries to update it as well
	db.Orders.findOneAndUpdate({_id: ObjectId(id)}, order, cb);
}

function remove(id, cb) {
	db.Orders.findOneAndDelete({_id: ObjectId(id)}, cb);
}

function getCusts(cb) {
	return db.Custs.find().toArray(cb);
}

function getItems(cb) {
	return db.Items.find().toArray(cb);
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
