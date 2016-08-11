var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i


$( window ).resize(function() {
  renderer()
});

var renderer = function(){
  $.ajax({ 
      url: "http://www.therealgreatwall.com/render",
		  type: "GET",
		  contentType: "application/json",
		  success: function(success){
        console.log("success")
		  },
		  error: function(xhr, status, err){
		    console.log(err);
		  }
  });
  
}


$("#brickButton").on('click', function(){
  var name = document.getElementById("nameInput").value || "anonymous"
  var email = document.getElementById("emailInput").value
  var title = name + ": " + document.getElementById("commentInput").value || name + ": No Message";
  
  var valid = re.test(email)

  if(valid){

    $.ajax({
      url: "http://www.therealgreatwall.com/addBrick",
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

