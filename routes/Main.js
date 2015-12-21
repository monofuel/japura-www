var mongoose = require('mongoose');
// var q = require('q');
var logger = require('../util/logger');
var users = require('../util/users');
mongoose.Promise = global.Promise;
var Post = mongoose.model('Post');
var User = mongoose.model('User');

module.exports = function (app, passport) {
  // TODO add support to / and /blog for range finds
  // EG: latest 10 posts, latest 20 posts, etc.
  app.get('/', function (req, res) {
    logger.info('GET: / ', req);
    // show the latest 10 front page posts
    var frontPage = Post
      .find({
        frontpage: true
      })
      .sort({
        timestamp: 'descending'
      })
      .limit(10)
      .exec();

    frontPage
      .then(function (posts) {
        return users.addUsernameToPosts(posts)
          .then(function () {
            res.render('pages/index', {
              posts: posts,
              user: req.user,
              page: 'home'
            });
          })
          .catch(function (err) {
            logger.error(err);
            res.render('pages/error', {
              user: req.user,
              page: 'error'
            });
          });
      })
      .catch(function (err) {
        logger.error(err);
        res.render('pages/error', {
          user: req.user,
          page: 'error'
        });
      });
  });

  app.get('/blog/:user', function (req, res) {
    logger.info('GET: /blog/' + req.params.user + ' ', req);

    User
      .findOne({
        username: req.params.user
      })
      .exec()
      .then(function (user) {
        return Post.find({
            user_id: user._id
          })
          .sort({
            timestamp: 'descending'
          })
          .limit(10)
          .exec();
      })
      .then(function (posts) {
        users.addUsernameToPosts(posts)
          .then(function () {
            res.render('pages/index', {
              posts: posts,
              user: req.user,
              page: 'blogs'
            });
          })
          .catch(function (err) {
            logger.error(err);
            res.render('pages/error', {
              user: req.user,
              page: 'error'
            });
          });
      })
      .catch(function (err) {
        logger.error(err);
        res.render('pages/error', {
          user: req.user,
          page: 'error'
        });
      });
  });
  app.get('/add_post',  users.isLoggedIn, function (req, res) {
    logger.info('GET: /add_post ', req);
    res.render('pages/add_post', {
      user: req.user,
      page: 'add_post'
    });
  });

  app.get('/edit_post', users.isLoggedIn, function (req, res) {
    logger.info('GET: /edit_post ', req);

    var allPosts = Post.find()
      .sort({
        timestamp: 'descending'
      })
      .exec();
    allPosts.then(function (posts) {
        res.render('pages/edit_post', {
          user: req.user,
          posts: posts,
          page: 'edit_post'
        });
      })
      .catch(function (err) {
        logger.error(err);
        res.render('pages/error', {
          user: req.user,
          page: 'error'
        });
      });
  });

  app.get('/about', function (req, res) {
    res.render('pages/about', {
      user: req.user,
      page: 'about'
    })
  });

  //dynmap is with a lowercase D because i did it like that
  //a long time ago and i didn't want to break anyone's bookmarks
  app.get('/dynmap', function (req, res) {
    res.render('pages/dynmap', {
      user: req.user,
      page: 'dynmap'
    })
  });

  app.get('/WebChat', function (req, res) {
    res.render('pages/webchat', {
      user: req.user,
      page: 'webchat'
    })
  });

  app.get('/Threest', function (req, res) {
    res.render('pages/threest', {
      user: req.user,
      page: 'projects'
    })
  });

  app.get('/profile', users.isLoggedIn, function (req, res) {
    res.render('pages/profile', {
      user: req.user,
      page: 'profile'
    });
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));


};
