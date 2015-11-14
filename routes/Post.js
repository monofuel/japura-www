var mongoose = require('mongoose');
var users = require('../util/users');
var Post = mongoose.model('Post');
var User = mongoose.model('User');


module.exports = function (app) {

  app.get("/post/:id", function (req, res, next) {
    Post.findById(req.params.id, function (err, post) {
      if (!post)
        return next(err);
      return res.send(post);
    });
  });

  app.post('/post', users.isLoggedIn, function (req, res, next) {

    newPost = new Post(req.body);
    newPost.timestamp = Math.floor(Date.now() / 1000);
    newPost.user_id = req.user._id;
    console.log("new post: %s", newPost.title);
    console.log("user: %s", JSON.stringify(req.user));

    if (!newPost) {
      res.status(500);
      res.render('no body posted');
      console.log('recieved new post without body');
      return;
    }

    newPost.save(function (err) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.status(200);
      res.send(newPost);
    });

  });
  app.put('/post/:id', users.isLoggedIn, function (req, res, next) {
    Post.findById(req.params.id, function (err, post) {
      if (!post)
        return next(err);

      post.title = req.body.title;
      post.body = req.body.body;
      post.timestamp = req.body.timestamp;
      post.frontpage = req.body.frontpage;
      post.user_id = req.body.user_id;

      post.save(function (err) {
        if (err)
          console.log('error updating post');
        else
          console.log('post updated successfully');
      })

    });
  });
  app.delete('/post/:id', users.isLoggedIn, function (req, res, next) {
    Post.findById(req.params.id, function (err, post) {
      console.log("removing " + post.title);
      post.remove();
    });
  });
};
