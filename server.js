// server.js
// where your node app starts


// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/getBricks", function (request, response) {

  $.ajax({
    url: 'https://api.mlab.com/api/1/databases/trump/collections/users?q={"email": "'+email+'"}&apiKey=mqvmM_b7JCNSRZg60uE18DljrstEwPuN',
    type: "GET",
    contentType: "application/json",
    success: function(data){
      if(data.length === 0){
        $.ajax({
          url: "https://api.mlab.com/api/1/databases/trump/collections/users?apiKey=mqvmM_b7JCNSRZg60uE18DljrstEwPuN",
          data: JSON.stringify({email: email, name: name, message: title}),
          type: "POST",
          contentType: "application/json",
          success: function(data){
            console.log(data);
            renderer()
          },
          error: function(xhr, status, err){
            console.log(err);
          }
        });
      }
    },
    error: function(xhr, status, err){
      console.log(err);
    }
  });
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/makeBrick", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
  ];

// listen for requests :)
//var listener = app.listen(process.env.PORT, function () {
//  console.log('Your app is listening on port ' + listener.address().port);
//});

var listener = app.listen(8005, function () {
  console.log('Your app is listening on port ' + 8005);
});