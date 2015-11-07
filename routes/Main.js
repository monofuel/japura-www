var mongoose = require('mongoose');
var Post = mongoose.model('Post');


module.exports = function(app,passport) {
  app.get('/', function (req,res) {
    //TODO: only show front page posts
    Post.find().sort({timestamp: 'descending'}).limit(10).exec(function(err,posts) {
      res.render('pages/index',{
        posts: posts
      });
    })
  });

  app.get('/blog/:user', function (req,res) {
    //req.params.user
    //TODO: only show posts for a specific user
    Post.find().sort({timestamp: 'descending'}).limit(10).exec(function(err,posts) {
      res.render('pages/index',{
        posts: posts
      });
    });
  });

  app.get('/add_post', function (req,res) {
    res.render('pages/add_post');
  });

  app.get('/edit_post', function (req,res) {
    //TODO: only show front page posts
    Post.find().sort({timestamp: 'descending'}).exec(function(err,posts) {
      res.render('pages/edit_post',{
        posts: posts
      });
    });
  });

  app.get('/about', function (req,res) {
    res.render('pages/about');
  });

  app.get('/dynmap', function (req,res) {
    res.render('pages/dynmap');
  });

  app.get('/WebChat', function (req,res) {
    res.render('pages/webchat');
  });

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
          return next();

      // if they aren't redirect them to the home page
      res.redirect('/');
  }

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('pages/profile', {
      user : req.user // get the user out of session and pass to template
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
          passport.authenticate('google', {
                  successRedirect : '/profile',
                  failureRedirect : '/'
          }));


};
