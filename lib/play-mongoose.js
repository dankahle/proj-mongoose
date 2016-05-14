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

var User = db.model('User', userSchema);

User.find({name: 'dank'}).lean().exec(function(err, user){
   if(err) {
      console.error(err.message)
   }
   console.log('user', user);
   mongoose.disconnect();

})


