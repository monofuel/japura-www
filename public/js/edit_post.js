var selected_post = null;

function select_post(id) {
  //TODO if they have edited a post and select a new post,
  //prompt before resetting fields for the new post

  //fetch the post via the object ID

  var xhttp = new XMLHttpRequest();

  xhttp.open('GET','/post/' + id,true);
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      if (xhttp.status == 200) {
        selected_post = JSON.parse(xhttp.responseText);
        show_post(selected_post);
      } else {
        console.log("retrieving post failed");
      }
    }
  }

  xhttp.send();
}

function show_post(post) {
  document.getElementById('title').value = post.title;
  document.getElementById('body').value = post.body;
  //TODO fetch username from user_id
  if (!post.user_id)
    post.user_id = 0;

  document.getElementById('author').value = post.user_id;

  //TODO this should probably be done serverside
  if (!post.timestamp)
    post.timestamp = Math.floor(Date.now()/1000);
  document.getElementById('timestamp').value = new Date(post.timestamp * 1000);

  document.getElementById('frontpage').checked = post.frontpage;
}

function update_post() {

  selected_post.title = document.getElementById('title').value;
  selected_post.body = document.getElementById('body').value;
  selected_post.user_id = document.getElementById('author').value;
  selected_post.timestamp = new Date (document.getElementById('timestamp').value).getTime() / 1000;
  selected_post.frontpage = document.getElementById('frontpage').value;


  var xhttp = new XMLHttpRequest();

  xhttp.open('PUT','/post/' + selected_post._id,true);
  xhttp.setRequestHeader('Content-Type','application/json')
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      if (xhttp.status == 200) {
        //TODO should bring user to specific post
        window.location = "/";
      } else {
        console.log("post failed");
      }
    }
  }

  xhttp.send(JSON.stringify(selected_post));
}

function delete_post() {

  var xhttp = new XMLHttpRequest();

  xhttp.open('DELETE','/post/' + selected_post._id,true);
  xhttp.setRequestHeader('Content-Type','application/json')
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      if (xhttp.status == 200) {
        //TODO should bring user to specific post
        window.location = "/";
      } else {
        console.log("delete failed");
      }
    }
  }

  xhttp.send(JSON.stringify(selected_post));
}
