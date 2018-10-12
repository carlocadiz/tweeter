/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {



  let textValue = 0;

  $( 'form').submit( function (event) {
    event.preventDefault();

//     $('.error').text('');
     $('.error').fadeTo(200,0);

    textCount = $(this).find('textarea').val().length;
    if (textCount === 0 || textCount === null){

      $('.error').fadeTo(200,1);
      //  $('.error').slideDown("slow");
$('.error').text('NO TWEET TYPED');

;    } else if ( textCount > 140) {
        $('.error').fadeTo(400,1);
        $('.error').text('TWEET TOO LONG');


    } else {


    let safe = $('textarea').val();
    const safeHTML = escape($('textarea').val());
    $("textarea").val(safeHTML);


    $.post( "/tweets", $( this ).serialize() );
      $(this).trigger('reset');
      $('#counter').text(140);
      loadTweets();
    }
  });


function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function loadTweets(){
   $.getJSON('/tweets').then( data => {
     renderTweets(data);
   })
}

function createTweetElement(tweet) {
  //let $tweet = $('#tweet-container header h4').addClass);
   var days = parseInt((Date.now() - tweet.created_at) / (1000*60*60*24));
   var newScript = `
           <section>
            <header>
            <img name="avatar" src=${tweet.user.avatars.small} >
            <h3 name="user">${tweet.user.name}</h3>  <h4 name="handle">${tweet.user.handle}</h4>
           </header>
           <article>
               ${tweet.content.text}
           </article>
           <footer>
              <span>${days} days ago</span>
              <ion-icon name="heart"></ion-icon>
              <ion-icon name="repeat"></ion-icon>
              <ion-icon name="flag"></ion-icon>
           </footer>
           </section>`

  return newScript;
}


function renderTweets(tweets) {

   $('#tweet-container').empty();
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets containe
   tweets.forEach(function(tweet){
      var $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
   });
}

   $( ".compose" ).click(function() {
      $( ".new-tweet" ).slideToggle( "slow" );
      $('textarea').focus();
   });


loadTweets();

});