define({ "api": [
  {
    "type": "get",
    "url": "/post/:id",
    "title": "Request a specific post",
    "name": "GetPost",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique post ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the post</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>Contents of post</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "timestamp",
            "description": "<p>unix timestamp when posted</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "frontpage",
            "description": "<p>Should this be on the frontpage</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User ID of the author</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Post.js",
    "groupTitle": "Posts"
  }
] });
