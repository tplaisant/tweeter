/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=> {
  
  const createTweetElement = function(tweet) {

    return $(`<article class="tweet-text">
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
        ${tweet.content.text}
      </section>
      <footer>
      ${tweet.created_at}
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

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
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
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(data);
})
