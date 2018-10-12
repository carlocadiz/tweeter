
$(document).ready(function() {
//  console.log("connected");


  $('.new-tweet textarea').on("keyup", function(event) {

  let $text = $(this).closest('.new-tweet').find('#counter');
  let counter = this.value.length;
  $($text).text(140 - counter);

 // $(this).closest('.new-tweet').find('#counter').text(140 - counter);
  if (counter > 140){
  //  $('#counter').css("color","red");
  $($text).css("color","red");
   } else {
      $($text).css("color","black");
  }

  });
});
