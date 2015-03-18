var mongodb = require('mongodb'),
	MongoClient = mongodb.MongoClient,
	ObjectId = mongodb.ObjectId,
	_ = require('lodash')

var db, Custs, Items, Orders;

function init() {
	var custs = [
		{name: 'dank', addrs: [
			{street: 'lovell', city: 'hillsboro'},
			{street: 'cambridge', city: 'dubuque'}
		]},
		{name: 'carl', addrs: [
			{street: 'valencia', city: 'beaverton'}
		]}
	];

	var items = [
		{name: 'bball', price: 9.99},
		{name: 'book', price: 5.23},
		{name: 'candle', price: 7.98}
	];

	Custs.remove({}, function(err) {
		if(err) return console.error(err);

		Custs.insertMany(custs, function(err) {
			if(err) return console.error(err);
		})
	});

	Items.remove({}, function(err) {
		if(err) return console.error(err);

		Items.insertMany(items, function(err) {
			if(err) return console.error(err);
		})
	});

	Orders.remove({}, function(err) {
		if(err) return console.error(err);
	})
};

var exp = {}
MongoClient.connect('mongodb://localhost:27017/dbn', function (err, db) {
	if (err) {
		console.error('Failed to connect to db: ' + err.message)
		throw err;
	}
	db = db;
	Custs = db.collection('custs');
	Items = db.collection('items');
	Orders = db.collection('orders');
	_.extend(exp, {db: db, Custs: Custs, Items: Items, Orders: Orders});
	//init()

/*
	def.resolve({
		db: db,
		Custs: Custs,
		Items: Items,
		Orders: Orders
	})
*/

});

module.exports = exports = exp;

