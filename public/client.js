var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i


$( window ).resize(function() {
  renderer()
});

var renderer = function(){
  var topcss = 960;
  var left = 25
  $.ajax({ 
      url: "https://api.mlab.com/api/1/databases/trump/collections/users?apiKey=mqvmM_b7JCNSRZg60uE18DljrstEwPuN",
		  type: "GET",
		  contentType: "application/json",
		  success: function(users){
		    ////////////
		    //var test = [{name: "lol", email: "lol", message: "lol"}]
		    //for(var i=0; i<1000; i++){
		    //   test.push({name: "lol", email: "lol", message: "lol"})
		    //}
		    //////////
		    $("#target").html(" ");
        var windowWidth = $(window).width()
		    //test.forEach(function(value){
		    users.forEach(function(value){
		      var title = value.message
		      if(left > windowWidth){
            left = 25;
            topcss -= 10;
          }
          $("#target").append('<img title="' + title + '" style="position: absolute; cursor:pointer; top: '+ topcss +'px; left: '+ left + 'px" src="https://cdn.hyperdev.com/us-east-1%3Aa4e699a8-d495-4e1a-adaf-ec1060021a42%2Fbrick.jpg" class="brick tooltip" />')
          left += 25;
		    })
		  },
		  error: function(xhr, status, err){
		    console.log(err);
		  }
  });
  
}

// console.log("secret: ", process.env.SECRET)



 // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyCDIPl1A2Q6tcg1ZHh8q6V8nWhXOssm5zI",
//   authDomain: "trumpwall-f504a.firebaseapp.com",
//   databaseURL: "https://trumpwall-f504a.firebaseio.com",
//   storageBucket: "",
//};

//var app = firebase.initializeApp(config);
//var database = app.database();
//var databaseRef = database.ref().child("users")


$("#brickButton").on('click', function(){
  var name = document.getElementById("nameInput").value || "anonymous"
  var email = document.getElementById("emailInput").value
  var title = name + ": " + document.getElementById("commentInput").value || name + ": No Message";
  
  var valid = re.test(email)

  if(valid){

    $.ajax({
      url: "https://www.therealgreatwall.com/addBrick",
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



    //  $.ajax({
    //  url: 'https://api.mlab.com/api/1/databases/trump/collections/users?q={"email": "'+email+'"}&apiKey=mqvmM_b7JCNSRZg60uE18DljrstEwPuN',
		 // type: "GET",
		 // contentType: "application/json",
		 // success: function(data){
		 //   if(data.length === 0){
		 //     $.ajax({
    //        url: "https://api.mlab.com/api/1/databases/trump/collections/users?apiKey=mqvmM_b7JCNSRZg60uE18DljrstEwPuN",
    //  		  data: JSON.stringify({email: email, name: name, message: title}),
    //  		  type: "POST",
    //  		  contentType: "application/json",
    //  		  success: function(data){
    //  		    console.log(data);
    //            renderer()
    //  		  },
    //  		  error: function(xhr, status, err){
    //  		    console.log(err);
    //  		  }
    //      });
		 //   }
		 // },
		 // error: function(xhr, status, err){
		 //   console.log(err);
		 // }
    //});
  } else {
    alert("Please enter a valid email")
  }

  
})


  renderer()


console.log("WebMaster: www.jphuangjr.com")

