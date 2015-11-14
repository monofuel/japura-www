var mongoose = require('mongoose');
var q = require('q');
mongoose.Promise = global.Promise;
var User = mongoose.model('User');
var logger = require('./logger');

//route
module.exports.isLoggedIn = function (req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    if (req.user.google.email == 'monofuel34089@gmail.com') //restrict to admin
      return next();
  }

  // if they aren't redirect them to the home page
  logger.info('rejecting access to ' + req.url, req);
  res.redirect('/');
}

//returns promise
module.exports.addUsernameToPosts = function (posts) {
  return new Promise(function (resolve, reject) {
    //translate user_id into username when generating the page
    var allUserPromises = new Array();
    posts.forEach(function (post) {
      var postPromise = module.exports.addUsernameToPost(post);
      allUserPromises.push(postPromise);
    });

    q.all(allUserPromises)
      .then(function () {
        resolve();
      });
  });
}

//returns promise
module.exports.addUsernameToPost = function (post) {
  var userPromise = User.findById(post.user_id)
    .exec();

  userPromise.then(function (user) {
    if (!user) {
      logger.error(new Error('user not found for post: ' + post.title));
    }
    post.username = user.username;
  });
  return userPromise;
}
