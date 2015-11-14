//expects an error Object
module.exports.error = function reportError(err) {
  var timestamp = new Date();
  console.log(timestamp.toTimeString() + " : " + err.stack);
  //TODO do more stuff like log it to a database and fancy stuff
}

//expects a single line of text
module.exports.info = function reportInfo(info, req) {
  var timestamp = new Date();

  if (req) {
    console.log("INFO: " + timestamp.toTimeString() + " : " + info + " FROM: " + req.ip);
  } else {
    console.log("INFO: " + timestamp.toTimeString() + " : " + info);
  }
  //TODO do more stuff like log it to a database and fancy stuff
}
