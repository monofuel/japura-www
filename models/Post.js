var mongoose = require('mongoose');
var User = mongoose.model('User');

PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  timestamp: Number,
  frontpage: Boolean,
  user_id: String
});

mongoose.model('Post', PostSchema);
