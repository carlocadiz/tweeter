

$(document).ready(function() {


// Function to escape text from textarea
function escapeHTML(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
 // Ajax get request to get collection of tweets from database. The renderTweets function with the  returned
 // data.
function loadTweets(){
   $.getJSON('/tweets').then( data => {
     renderTweets(data);
   })
}

// Function to loop through array of data objects and passes each object element to the createTweetElement function
// The tweet container is emptied prior to looping and tweets are prepended to the empty container in order for
// newest tweets are shown first.
function renderTweets(tweets) {
   $('#tweet-container').empty();
   tweets.forEach(function(tweet){
      let $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
   });
}

// Function to add the attributes for each tweet to create a dynamic HTML page.
function createTweetElement(tweet) {
   let newScript = `
           <section>
            <header>
            <img name="avatar" src=${tweet.user.avatars.small} >
            <h3 name="user">${tweet.user.name}</h3>  <h4 name="handle">${tweet.user.handle}</h4>
           </header>
           <article>
               ${tweet.content.text}
           </article>
           <footer>
              <span>${getTimeAgo(tweet.created_at)}</span>
              <ion-icon name="heart"></ion-icon>
              <ion-icon name="repeat"></ion-icon>
              <ion-icon name="flag"></ion-icon>
           </footer>
           </section>`

  return newScript;

}

// Function called to calculate time elapsed since tweet was created. The complete date string is returned
// based on hours or days.
function getTimeAgo(dateCreated){

  let numberOfDays = parseInt((Date.now() - dateCreated) / (1000*60*60*24));
  let numberOfHours = parseInt((Date.now() - dateCreated) / (1000*60*60));

  if (numberOfDays > 0 ){
    if(numberOfDays > 1){
      return `${numberOfDays} days ago` ;
     } else {
       return `1 day ago`;
     }
  }else {
    if (numberOfHours > 1 || numberOfHours === 0){
      return `${ numberOfHours} hours ago`;
    } else {
        return `1 hour ago`;
    }
  }
}

// Event listener for the new tweet form. When tweet is submitted, default behaviour is halted in order to
// process our submit request. Error handling is peformed on value of textarea. Ajax post request is sent to
// '/tweets'.

  $( 'form').submit( function (event) {
    event.preventDefault();

    $('.error').hide();

    textCount = $(this).find('textarea').val().length;
    if (textCount === 0 || textCount === null){
      $('.error').fadeTo(200,1);
      $('.error').text('NO TWEET TYPED');
    } else if ( textCount > 140) {
        $('.error').fadeTo(200,1);
        $('.error').text('TWEET TOO LONG');
    } else {
      //  let safe = $('textarea').val();
        // The textarea value is sent to a function to handle XSS.
        const safeHTML = escapeHTML($('textarea').val());
        $("textarea").val(safeHTML);

        // Ajax post request
        $.post( "/tweets", $( this ).serialize() );

        // form is reset. Counter is reset to 140 and loadTweets() function is called to reload the new tweet.
        $(this).trigger('reset');
        $('#counter').text(140);
        loadTweets();
     }
  });

 // Event handler for compose button. When clicked, the new-tweet container will slide up and down with subsequent
 // clicks.
    $( ".compose" ).click(function() {
      $( ".new-tweet" ).slideToggle( "slow" );
      $('textarea').focus();
   });

// Function call to load the persisted tweets on the database

  loadTweets();

});