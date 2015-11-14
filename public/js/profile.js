function update_username() {
  var username = document.getElementById('username').value;
  var user_id = document.getElementById('user_id').innerHTML;
  var user = {
    username: username
  };

  var xhttp = new XMLHttpRequest();

  xhttp.open('PUT', '/user/' + user_id, true);
  xhttp.setRequestHeader('Content-Type', 'application/json')
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4) {
      if (xhttp.status == 200) {
        window.location = "/profile";
      } else {
        console.log("post failed");
      }
    }
  }

  xhttp.send(JSON.stringify(user));
}
