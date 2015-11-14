mongoose = require('mongoose');
mongoose.Promise = global.Promise;
User = mongoose.model('User');
var logger = require('../util/logger');
var users = require('../util/users');

module.exports = function (app) {

  //users page
  app.get("/users", function (req, res, next) {

  });

  app.get("/user/:id", function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
      if (!user)
        return next(err);

      var user = {
        name: user.username
      }
      return res.send(user);
    });
  });

  app.put("/user/:id", users.isLoggedIn, function (req, res, next) {
    logger.info('PUT: ' + req.url + ' ', req);
    User.findById(req.params.id)
      .exec()
      .then(function (user) {
        //TODO better user comparison.
        if (!user || user.google.id !== req.user.google.id) {
          logger.info('invalid user');
          return;
        }

        logger.info('updating user ' + user.username + ' to ' + req.body.username);
        user.username = req.body.username;

        return user.save();

      })
      .catch(function (err) {
        res.send({
          error: 'update failed: ' + err.message()
        });
      });
  });

};
