var express = require('express');
var app = express();
//var config = require("./public/keys.js")

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
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