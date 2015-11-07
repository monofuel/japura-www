function submitPost() {
  var post = {
    title: document.getElementById('title').value,
    body: document.getElementById('body').value
  }

  var xhttp = new XMLHttpRequest();

  xhttp.open('POST','/post',false);
  xhttp.setRequestHeader('Content-Type','application/json')
  xhttp.send(JSON.stringify(post));
  if (xhttp.status == 200) {
    window.location = "/";
  } else {
    console.log("post failed");
  }
}
