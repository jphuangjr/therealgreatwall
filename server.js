var express = require('express');
var app = express();
var $ = require("jQuery")
//var config = require("./public/keys.js")

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/render", function (request, response) {
  $.ajax({
    url: "https://api.mlab.com/api/1/databases/trump/collections/users?apiKey=" + "mqvmM_b7JCNSRZg60uE18DljrstEwPuN",
    type: "GET",
    contentType: "application/json",
    success: function(users){
      var topcss = 960;
      var left = 25
      $("#target").html(" ");
      var windowWidth = $(window).width()
      users.forEach(function(value){
        var title = value.message
        if(left > windowWidth){
          left = 25;
          topcss -= 10;
        }
        $("#target").append('<img title="' + title + '" style="position: absolute; cursor:pointer; top: '+ topcss +'px; left: '+ left + 'px" src="https://cdn.hyperdev.com/us-east-1%3Aa4e699a8-d495-4e1a-adaf-ec1060021a42%2Fbrick.jpg" class="brick tooltip" />')
        left += 25;
      })
      response.send(200)
    },
    error: function(xhr, status, err){
      console.log("ERROR: ",err);
    }
  });
});

app.post("/addBrick", function (request, response) {
  console.log(request.data)
  $.ajax({
    url: 'https://api.mlab.com/api/1/databases/trump/collections/users?q={"email": "'+request.data.email+'"}&apiKey=' + process.env.API,
    type: "GET",
    contentType: "application/json",
    success: function(data){
      if(data.length === 0){
        $.ajax({
          url: "https://api.mlab.com/api/1/databases/trump/collections/users?apiKey=" + process.env.API,
          data: JSON.stringify({email: request.data.email, name: request.data.name, message: request.data.title}),
          type: "POST",
          contentType: "application/json",
          success: function(data){
            console.log(data);
            response.sendStatus(200);
          },
          error: function(xhr, status, err){
            console.log(err);
            response.sendStatus(400);
          }
        });
      }
    },
    error: function(xhr, status, err){
      console.log(err);
      response.sendStatus(400);
    }
  });

});




//listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//var listener = app.listen(8005, function () {
//  console.log('Your app is listening on port ' + 8005);
//});