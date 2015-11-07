mongoose = require('mongoose');
User = mongoose.model('User');

module.exports = function(app) {

  app.get("/user/:id", function(req,res,next) {
    User.findById(req.params.id,function(err,user) {
      if (!user)
        return next(err);

      var user = {
        name:
      }
      return res.send(user.name);
    });
  });

};
