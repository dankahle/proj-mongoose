

var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	async = require('async')



var updateDocument = function(db, cb) {
	var collection = db.collection('documents');
	collection.update({ a : 2 }, { $set: { b : 1 } }, cb);
}

MongoClient.connect('mongodb://localhost:27017/dbn', function(err, db) {
	if(err) return console.error(err);

	var coll = db.collection('coll');

	async.series([
		function(cb) {
			coll.remove({}, cb);
		},
		function(cb) {
			coll.insert([{a : 1}, {a : 2}, {a : 3}], cb);
		},
		function(cb) {
			coll.update({a:2}, {$set: {b: 1}}, cb);
		},
		function(cb) {
			coll.find({}).toArray(cb);
		}
	], function(err, results) {
		console.log(results[3])
	})



/*
	coll.remove({}, function(err, docs) {

		coll.insert([{a : 1}, {a : 2}, {a : 3}], function(err, docs) {
			if(err) return console.error(err);
			assert(docs.length == 3)

			coll.update({a:2}, {$set: {b: 1}}, function(err, count) {
				assert(count == 1);

				coll.find({}).toArray(function(err, docs) {
					console.log(docs)
					db.close()
				})
			})
		})
	});
*/

});