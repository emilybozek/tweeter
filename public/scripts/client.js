$(document).ready(function() {
  // Submit Handler
  $(".tweet-form").on('submit', function(event) {
    event.preventDefault();
    console.log($(this).serialize());
    if ($("#tweet-text").val().length === '') {
      return showToastError(toastError("Tweet cannot be empty!"));
    }
    if ($(".counter").val() < 0) {
      return showToastError(toastError(`Tweet cannot exceed ${MAX_TWITTER_CHAR_COUNT} characters!`));
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
      data: "data"
    })
      .then((data) => {
      // $("#tweet-input").val('');
      // $(".counter").val('140');
      // $(".tweets-container").empty();
      renderTweets(data);
      });
  };
    loadTweets();
  });
  

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

 const toastError = (errorMessage) => {
  return $(`
  <section class="toast-error" data-id="toast-error">
    <i class="fa-solid fa-circle-exclamation toast-content" id="error-icon"></i>
    <div class="error-message toast-content"><strong>Error: </strong>${errorMessage}</div>
    <i class="fa-solid fa-xmark toast-content" id="error-close" data-id="error-close"></i>
  </section>
  `);
};

const showToastError = (toastError) => {
  if ($(dataTags.error).length > 0) {
    return;
  }
  $(dataTags.nav).append(toastError);
  $(dataTags.errorClose).on('click', function(event) {
    event.preventDefault();
    $(dataTags.error).remove();
  });
};
