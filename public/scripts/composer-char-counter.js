
$(document).ready(function() {

  $('.new-tweet textarea').on("keyup", function(event) {

  let $text = $(this).closest('.new-tweet').find('#counter');
  let counter = this.value.length;
  $($text).text(140 - counter);

  if (counter > 140){
    $($text).css("color","red");
  } else {
      $($text).css("color","black");
  }

  });
});
