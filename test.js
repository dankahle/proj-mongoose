var mongodb = require('mongodb'),
	MongoClient = mongodb.MongoClient,
	ObjectId = mongodb.ObjectId,
	_ = require('lodash')

var db, Custs, Items, Orders;

function out(err, val) {
	if(err) return console.error(err);
	console.log(val)
}

MongoClient.connect('mongodb://localhost:27017/dbn', function (err, db) {
	if (err) def.reject("Failed to connect to database.")
	db = db;
	Custs = db.collection('custs');
	Items = db.collection('items');
	Orders = db.collection('orders');


	db.command({ping:1},out)


});


