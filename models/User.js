var mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
  username: String,
  facebook: {
      id: String,
      token: String,
      name: String,
      email: String
  },
  google: {
      id: String,
      token: String,
      name: String,
      email: String
  }
});

mongoose.model('User',UserSchema);
