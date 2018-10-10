/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 /*
 $(document).ready(function() {
  /*
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(function() {
  var $button = $('#load-more-posts');
  $button.on('click', function () {
    console.log('Button clicked, performing ajax call...');
    $.ajax('more-posts.html', { method: 'GET' })
    .then(function (morePostsHtml) {
      console.log('Success: ', morePostsHtml);
      $button.replaceWith(morePostsHtml);
    });
  });
*/

$(document).ready(function() {


$( 'form').submit( function (event) {

   event.preventDefault();
   $.post( "/tweets", $( this ).serialize() );
  //loadTweets();
   //console.log( this );
   $(this).trigger('reset');
   $('#counter').text(140);
   loadTweets();



});

function loadTweets(){ //  $.get("/tweets")
   $.getJSON('/tweets').then( data => {
     renderTweets(data);
   })
//.catch( error => console.log("BOOOO... ",error))

}

function createTweetElement(tweet) {
  //let $tweet = $('#tweet-container header h4').addClass);
   var days = parseInt( tweet.created_at / (1000*60*60*24));
   var newScript = `
           <section>
            <header>
            <img name="avatar" src=${tweet.user.avatars.small} >
            <h3 name="user">${tweet.user.name}</h3>  <h4 name="handle">${tweet.user.handle}</h4>

           </header>
           <article>
              <textarea readonly> ${tweet.content.text}</textarea>
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

  tweets.forEach(function(tweet){
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets containe
    var $tweet = createTweetElement(tweet);

    $('#tweet-container').prepend($tweet);
   });

}



loadTweets();

});