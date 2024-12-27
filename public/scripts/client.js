/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=> {

  const isTweetValid = () => {
    const $tweetText = $("#tweet-text");    

    if ($tweetText.val().length > 140) {
      alert("TOO LONG");  
      return false;  
    } else if($tweetText.val() === "") {
      alert("EMPTY TWEET");
      return false;
    }
    return true;
  }

  const createTweetElement = function(tweet) {

    const tweetCreatedAt = timeago.format(tweet.created_at);

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    return $(`<article class="tweet-text outra">
      <header>
        <span class="user-img">      
          <img src="${escape(tweet.user.avatars)} class="old-tweets">
          <span class="user-info">
            <p>${escape(tweet.user.name)}</p>
            <p>${escape(tweet.user.handle)}</p>
          </span>
        </span>
      </header>
      <section class="tweet-text">
        ${escape(tweet.content.text)}
      </section>
      <footer>
      ${tweetCreatedAt}
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`
    );
  }

  const renderTweets = (arrayOfTweets) => {
    for (let tweet of arrayOfTweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }    
  }
  
  const loadTweets = () => {
    const jsonFromServer = $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (allTweets) => {
        renderTweets(allTweets);
      }
    }).fail(() => {
      console.error('Error loading tweets');
    });   
  }
  
  loadTweets();

  let $form = $("form");

  $form.on("submit", (event)=> {        
    const formData = $form.serialize();        
    
    event.preventDefault();
    if (isTweetValid()) {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: formData,
        success: (response) => {
          $("#tweet-text").val("");
          $('#tweets-container').empty();
          $('.counter').val(140);
          loadTweets();
        }
      });
    }
  })

})
