
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId,
	_ = require('lodash')

var db = mongoose.createConnection('localhost', 'db');
db.on('error', function(err) {
	console.log('dberr:', err)
})

var addrObj = {street: String, city: String};
var custSchema = new Schema({
	name: String,
	addrs: [addrObj]
});
Cust = db.model('Cust', custSchema);

var itemObj = {
	name: String,
	price: Number
};
var itemSchema = new Schema(itemObj)
Item = db.model('Item', itemSchema);

function ltFive(val) {
	return val < 5;
}

var orderSchema = new Schema({
	cust: {type: ObjectId, ref: 'Cust'},
	date: {type: Date, default: new Date},
	total: Number,
	shipAddr: addrObj,
	items: [_.extend({}, itemObj, {quantity: {type: Number, validate: ltFive}})]
})
Order = db.model('Order', orderSchema);

function init() {

	Cust.remove({}, function(err) {
		if(err) console.error(err);

		var custs = [
			{name: 'dank', addrs: [
				{street: 'lovell', city: 'hillsboro'},
				{street: 'cambridge', city: 'dubuque'}
			]},
			{name: 'carl', addrs: [
				{street: 'valencia', city: 'beaverton'}
			]}
		];


		Cust.create(custs, function(err){
			if(err) console.error(err);

			Cust.findOne({name: 'dank'}, function(err, doc) {
				if(err) console.error(err);
				doc.addrs[0].city = 'hillsburro';
				doc.addrs.unshift({street: 'central', city: 'dubuque'});
				doc.save(function(err, doc) {
					if(err) console.error(err);
					//console.log(doc)
				})
			});
		});

	});

	Item.remove({}, function(err) {
		if(err) console.error(err);

		var items = [
			{name: 'bball', price: 9.99},
			{name: 'book', price: 5.23},
			{name: 'candle', price: 7.98}
		];
		Item.create(items, function(err){
			if(err) console.error(err);
			//console.log(arguments)
		});
	});

	Order.remove({}, function(err) {
		if(err) console.error(err);
	})
};
//init();

module.exports = exports = {
	db: db,
	Cust: Cust,
	Order: Order
}
