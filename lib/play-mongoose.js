var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    _ = require('lodash')

var db = mongoose.createConnection('localhost', 'db');
db.on('error', function(err) {
    console.log('dberr:', err)
})

mongoose.set('debug', true);

var userSchema = mongoose.Schema({
    name: String,
    age: Number
})

//var User = new mongoose.Model(userSchema);

mongoose.disconnect();


