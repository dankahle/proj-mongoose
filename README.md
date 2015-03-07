### proj-mongoose

This is a simple POC for mongoose, but then decided to duplicate the database/repo code using the [node mongo driver](https://github.com/mongodb/node-mongodb-native). I felt the mongoose code was constraining. It was, but then allows you to declare a schema and validate. The population in the native driver took a bit, but came up with a solution easily enough using async.js, albeit easy enough to do with Q as well. All in all, think I could crank out mongo code just fine in either, so not a good enough test I suppose. Surely you'd get good at mongoose and it will evolve as well adding even more features. I'm still on the fence though as I favor simplicity. Oh, and I've spent a lot of time learning the mongo client syntax... the same syntax is used in the native driver, so reinforces that knowledge. Use it or lose it, is my life story. Mongoose doesn't use it and then forces you to learn an entirely different api. I know it now though so no biggy.


