
$(document).ready(function() {


console.log("connected");
});



$('.new-tweet textarea').bind("keyup", function(event) {

  let counter = this.value.length;


$(this).closest('.new-tweet').find('#counter').text(140 - counter);
if (counter > 140){
  $('#counter').css("color","red");
} else {
    $('#counter').css("color","black");
}

});

