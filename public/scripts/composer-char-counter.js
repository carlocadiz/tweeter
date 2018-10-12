

// Function to count the number of characters entered into textarea.
// The character counter will change depending on the length and colour of font will change to
// red over 140 characters.

$(document).ready(function() {

  $('.new-tweet textarea').on("keyup", function(event) {

  let $text = $(this).closest('.new-tweet').find('#counter');
  let counter = this.value.length;
  $($text).text(140 - counter);

  // change the colour of the counter based on string length.
  if (counter > 140){
    $($text).css("color","red");
  } else {
      $($text).css("color","black");
  }

  });
});
