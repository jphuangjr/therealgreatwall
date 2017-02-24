var express = require('express');
var app = express();
var request = require("request")
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/render", function (req, res) {

  request({
    url: "https://api.mlab.com/api/1/databases/trump/collections/users?apiKey=" + process.env.API,
    method: "GET"
  }, function(error, response, body){
    res.send(JSON.parse(body))
  })

});

app.post("/addBrick", function(req, res) {
  //request({
  //  url: 'https://api.mlab.com/api/1/databases/trump/collections/users?q={"email": "'+req.body.email+'"}&apiKey=' + process.env.API,
  //  method: "GET"
  //}, function(error, response, body){
  //  var data = JSON.parse(body)
  //  if(data.length === 0){
      request({
        url: "https://api.mlab.com/api/1/databases/trump/collections/users?apiKey=" + process.env.API + "&l=100000",
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({name: req.body.name, message: req.body.message})
      }, function(error1, response1, body1){
        res.send(200)

      })

    //}
  //})

});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//var listener = app.listen(8005, function () {
//  console.log('Your app is listening on port ' + 8005);
//});