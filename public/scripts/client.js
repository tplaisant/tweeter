/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=> {

  const isTweetValid = () => {
    const $tweetText = $("#tweet-text");    

    if ($tweetText.val().length > 140) {// Is the text over 140 char?    
      const $errorMsg = $('#too-long');
      $("#errors").show();
      $("#empty").hide();  
      $errorMsg.addClass('error-message'); 
      $errorMsg.slideDown("slow");     
      return false;

    } else if($tweetText.val() === "") {// Is the text empty?         
      const $errorMsg = $('#empty');
      $("#errors").show();
      $("#too-long").hide();
      $errorMsg.addClass('error-message');
      $errorMsg.slideDown("slow");        
      return false;
    }
    $("#errors").hide();
    return true;
  }
  
  const createTweetElement = function(tweet) {

    const tweetCreatedAt = timeago.format(tweet.created_at);

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    return $(`<article class="tweet-box box">
      <header>
        <span class="user-img">      
          <img src="${tweet.user.avatars} class="old-tweets">
          <span class="user-info">
            <p>${tweet.user.name}</p>
            <p>${tweet.user.handle}</p>
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

  const renderTweets = (arrayOfTweets, onlyLast) => {    
    // Sort to get the newest tweet on top
    arrayOfTweets.sort(function (a, b) {
      if (a.created_at < b.created_at) {
        return 1;
      }
      if (a.created_at > b.created_at) {
        return -1;
      }      
      // a must be equal to b
      return 0;
    });
    if (onlyLast) {      
      // Only add the last tweet to the top
      $('#tweets-container').prepend(createTweetElement(arrayOfTweets[0]));
    } else {
    // Loop through all tweets
      for (let tweet of arrayOfTweets) {
        $('#tweets-container').append(createTweetElement(tweet));
      }    
    }
  }
  
  const loadTweets = (onlyLast) => {
    // Request all tweets from 'DB'
    const jsonFromServer = $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (allTweets) => {
        renderTweets(allTweets, onlyLast);
      }
    }).fail(() => {
      console.error('Error loading tweets');
    });   
  }
  
  loadTweets(false);

  let $form = $("form");

  $form.on("submit", (event)=> {        
    const formData = $form.serialize();    
    event.preventDefault();
    // Validate tweet and post if ok
    if (isTweetValid()) {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: formData,
        success: (response) => {          
          $("#tweet-text").val("");          
          $('.counter').val(140);
          loadTweets(true);
        }
      });
    }
  })
})