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
      <output class="tweet-time" for="tweet-text">
      ${timeago.format(tweet.created_at)}
      </output>
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
const renderTweets = function (tweets) {
  tweets.forEach((element) => {
    $(".tweets-container").prepend(createTweetElement(element));
  });
};

// Remove Error Message 
const remove = function(el) {
  let element = el;
  element.remove();
}

$(document).ready(function() {

  // Submit Handler
  $(".tweet-form").on('submit', function(event) {
    event.preventDefault();
    if ($("#tweet-text").val().length === 0) {
      $(".new-tweet").prepend('<p class="error-message">Tweet cannot be empty!</p>')
      return $(".tweet-form").on('click', function(event) {
        remove($(".error-message"))
      });
    }
    if ($(".counter").val() < 0) {
      $(".new-tweet").prepend('<p class="error-message">Tweet is too long!</p>')
      return $(".tweet-form").on('click', function(event) {
        remove($(".error-message"))
      });
    }
    $.ajax( { 
      method: 'POST',
      url: "/tweets",
      data: $(this).serialize()
    })
    .then(() => {
      loadTweets();
    });

  });
  
  // Loader
  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
    })
      .then((data) => {;
      $("textarea").val("");
      $(".counter").val("140");
      $(".tweets-container").empty();
      renderTweets(data);
      });
  };
    loadTweets();
});
  
