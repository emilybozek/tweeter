$(document).ready(function() {

// Element Creator
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

// Renderer
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    let allTweets = createTweetElement(tweet);
    $('.tweets-container').prepend(allTweets);
  }
 }

// Loader
const loadTweets = function() {
  $.ajax("/tweets").then((tweets) => {
    $(".tweets-container").empty();
    renderTweets(tweets);
  });
};

// Submit Handler
$(".tweet-form").submit(function(event) {
  event.preventDefault();
  let newTweet = $("#tweet-text").serialize();
  $.ajax({
    type: "POST",
    url: "/tweets",
    data: newTweet,
  })
  // For Additional Tweets
  loadTweets()
})

// For Initial Tweets
loadTweets()

});
