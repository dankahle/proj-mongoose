'use strict';

var mongodb = require('mongodb'),
	MongoClient = mongodb.MongoClient
	ObjectId = mongodb.ObjectId,
	async = require('async')



var db, coll;
MongoClient.connect('mongodb://localhost:27017/dbn', function (err, _db) {
	if (err) return console.error(err);
	db = _db;
	coll = db.collection('custs');
//{_id: "54fa412b93f6b5e3365165a4"}
	coll.findOne({_id: ObjectId("54fa412b93f6b5e3365165a4")}, function(err, doc) {
		console.log(doc);
		db.close()
	})

	//db.findOne({_id: ""})



});


/*
var db, coll;
async.series([
		function (cb) {
			MongoClient.connect('mongodb://localhost:27017/dbn', function (err, _db) {
				if (err) cb(err);
				db = _db;
				coll = db.collection('coll');
				cb()
			});
		},
		function(cb) {
			coll.remove({}, cb);
		},
		function (cb) {
			coll.insertMany([{a: 1}, {a: 2}, {a: 3}], cb);
		},
		function (cb) {
			coll.update({a: 2}, {$set: {b: 1}}, cb);
		},
		function (cb) {
			coll.find({}).sort({a: -1}).toArray(cb);
		}
	], function (err, results) {
		console.log(results[4])
	}
)
*/


/*
 MongoClient.connect('mongodb://localhost:27017/dbn', function (err, db) {
 if (err) return console.error(err);
 var coll = db.collection('coll');

 coll.remove({}, function (err, docs) {

 coll.insert([{a: 1}, {a: 2}, {a: 3}], function (err, docs) {
 if (err) return console.error(err);
 assert(docs.length == 3)

 coll.update({a: 2}, {$set: {b: 1}}, function (err, count) {
 assert(count == 1);

 coll.find({}).toArray(function (err, docs) {
 console.log(docs)
 db.close()
 })
 })
 })
 });
 });
 */


