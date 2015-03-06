var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = mongoose.ObjectId,
	Promise = mongoose.Promise,
	_ = require('lodash');

var db = mongoose.createConnection('localhost', 'db');
db.on('error', function(err) {
	console.log('dberr:', err)
})

var	userSchema = new Schema({
	name: String,
	age: Number
});

var User = db.model('User', userSchema);

function init() {
	User.remove({}, function(err) {
		if(err) console.error(err);

		var users = [
			{name: 'dank', age: 50},
			{name: 'carl', age: 60}
		];
		User.create(users, function(err){
			if(err) console.error(err);
		});
	});
}

function get(cb) {
	return User.find().lean().exec(cb);
}

function getOne(id, cb) {
	return User.findById(id).lean().exec(cb);
}

function insert(doc, cb) {
	var user = new User(doc);
	user.save(cb);
}

function update(user, cb) {
	User.findById(user._id, function(err, doc) {
		if(err) return cb(err);
		doc.name = user.name;
		doc.age = user.age;
		doc.save(cb);
	})
}

function remove(id, cb) {
	User.findById(id, function(err, doc) {
		if(err) return cb(err);
		if(!doc) return cb(new Error('Not found'));
		doc.remove(cb);
	})
}

/*
// how do to a promise in mongoose
function save(doc) {
	var def = new mongoose.Promise;
	var user = new User(doc);
	user.save(function(err, doc) {
		var obj = doc.toObject();
		def.resolve(err, obj);
	});

	return def;
}
*/

module.exports = exports = {
	init: init,
	get: get,
	getOne: getOne,
	insert: insert,
	update: update,
	remove: remove
}