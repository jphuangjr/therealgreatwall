var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

$( window ).resize(function() {
  renderer()
});

$("#count_box").on("click", function(){
  $.ajax({
    url: "/render",
    type: "GET",
    //contentType: "application/json",
    success: function(data){
      $("#main").hide();
      var html = "<div>"
      for(var i=0; i<data.length; i++){
        var title = data[i].message
        html += "<p>" + title + "</p>"
      }
      $("#list").html(html + "</div>")
    },
    error: function(xhr, status, err){
      console.log(err);
    }
  })
})


var renderer = function(){
  $.ajax({ 
      url: "/render",
		  type: "GET",
		  //contentType: "application/json",
		  success: function(data){
        $("#count_box").html(data.length + " Bricks");
        var topcss = 960;
        var left = 25
        $("#target").html(" ");
        var windowWidth = $(window).width()
        for(var i=0; i<data.length; i++){
          var title = data[i].message
          if(left > windowWidth){
            left = 25;
            topcss -= 10;
          }
          $("#target").append('<img title="' + title + '" style="position: absolute; cursor:pointer; top: '+ topcss +'px; left: '+ left + 'px" src="https://cdn.hyperdev.com/us-east-1%3Aa4e699a8-d495-4e1a-adaf-ec1060021a42%2Fbrick.jpg" class="brick tooltip" />')
          left += 25;
        }

        //console.log("success")
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
      url: "/addBrick",
      data: JSON.stringify({email: email, name: name, message: title}),
      type: "POST",
      contentType: "application/json",
      success: function(data){
        renderer()
      },
      error: function(xhr, status, err){

      }
    });

  } else {
    alert("Please enter a valid email")
  }

  
})


renderer()


console.log("WebMaster: www.jphuangjr.com")
console.log("To see full list of signer, please type 'showList()' in console line below")

