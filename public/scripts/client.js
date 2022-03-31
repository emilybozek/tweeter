$(document).ready(function() {

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

const renderTweets = function(tweets) {
 tweets.forEach(element => {
  $('.tweet-container').append(createTweetElement(element))
 });
}

const createTweetElement = function(tweet) {
  let $tweet = `
  <article class="tweet">
    <header class="profile">
      <div class="picture-name">
        <img class="picture" src="${tweet.user.avatars}"/>
        <div class="name">${tweet.user.name}</div>
      </div>
      <div class="tweeter-handle">${tweet.user.handle}</div>
    </header>
    <div class="tweet-body">${tweet.content.text}</div>
    <footer class="tweet-footer">
      <div class="tweet-age">${timeago.format(tweet.created_at)}</div>
      <div class="tweet-actions">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `
  return $tweet;
}

})
