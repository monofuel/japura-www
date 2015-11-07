var mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
  id: { type: String, index: true, unique: true },
  token: String,
  name: String,
  email: String,
  username: String
});

mongoose.model('User',UserSchema);
