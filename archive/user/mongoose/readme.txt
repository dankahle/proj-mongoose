

user mongoose

///////////// node

* you found out the User(objFromBrowser) would insert instead of update. Probably the versionNo then, as you have to find() then call save to do it right. User(obj) was only used for inserting.

* could have gone with promises or callbacks. In the end I think the callbacks were cleaner. You found you can always use your own callback if you need to manipulate it before calling their callback. 

* mongoose.Promise worked just fine and their resolve(err, val) function was special as it handled both

* lean() is the man you want for pojos.

* seemed cleaner to separate insert/update so you used the verbs correctly: get/post/put/delete. Just mucks stuff up to just have save. in the end you have to use their save for validation, fine, but that doesn't mean you have to mess up your api over it.

* the db init with the server was nice. You can muck up the db all you want, restart the server and all is back to init values.

* you don't want to res.status(500).send(err) as you don't want to send sensitive erors back, the res.sendStatus(500) works just fine. If you had to send back info though, that worked fine, BUT, it doens't send back and Error obj though (really?), it will send back anything but that :). Funny.

* express paths start with a / I guess. 

* was nice to have both sites on the same port for a change and way easy to do with express.static

//////////////// angular

* the repo returning promises that altered the resp to resp.data is a nice pattern

* refresh after changes seems wasteful, but then you know what you have at least and have verification stuff was actually saved.

