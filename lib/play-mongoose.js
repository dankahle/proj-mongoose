var mongoose = require('mongoose'),
   Schema = mongoose.Schema,
   ObjectId = Schema.Types.ObjectId,
   _ = require('lodash'),
   Q = require('q'),
   port = process.env.PORT || 27018;

/*
 var userRepo = require('./userRepo');
 userRepo.init();
 return;
 */

mongoose.Promise = require('q').Promise;

var db = mongoose.createConnection('localhost', 'db', port);

db.on('open', function (val) {

   console.log('mongo listening on ', port)
   setTimeout(function () {
      db.close();
   }, 100);
})

db.on('close', function (val) {
   console.log('mongo closed');
})

db.on('error', function (err) {
   console.dir(err);
})


//mongoose.set('debug', true);

var addrSchema = Schema({
   street: String,
   city: String
});


var userSchema = Schema({
   name: {type: String, required: true, trim: true, maxlength: 5},
   age: {type: Number, required: true, max: 20},
   addrs: [{street: String, city: String}]
})
//userSchema.add({stuff: String});


var User = db.model('User', userSchema);

User
   .where('name').eq('one')
   .where('age').lt(5)
   .then(function (doc) {
      console.log(doc)
   })


/*
 User.create([
 {name: 'one', age: 5},
 {name: 'two', age: 4},
 {name: 'three', age: 3},
 ])
 */


/*
 User.findOneAndRemove({name: 'two'})
 .then(function(docs) {
 return listUsers();
 })
 .catch(function(err) {
 console.log(err)
 })
 */

/*
 User.find().or([{name:'one'}, {name:'two'}]).remove()
 .then(function() {
 User.create([{name: 'one', age:1}, {name:'two', age:2}])
 .then(function(docs) {
 console.log('crfeated ' + docs.length + 'docs')
 return listUsers();

 })
 .catch(function(err) {
 console.log(err)
 })
 })
 */



/*
 User.findOne({name: 'mary'})
 .then(function(doc) {
 if (doc) {
 return doc.remove();
 }
 else
 return Q();
 })
 .then(function() {
 var newUser = new User({
 name: 'mary   ',
 age: 20,
 stuff: 'lala',
 addrs: [
 {street: 'lovell', city: 'hillsboro'},
 {street: 'pinecrest', city: 'woodland park'},
 ]
 });

 return Q(newUser.save())
 .then(function(doc) {
 return listUsers();
 }, function(err) {
 console.log(err);
 })

 })
 .catch(function(err) {
 console.log('err', err)
 })
 */

function listUsers() {
   return User.find({}, 'name age -_id')
      .then(function (users) {
         users.forEach(function (user) {
            console.log(user)
         })
      })
}

