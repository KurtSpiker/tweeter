$(document).ready(function() {  
  
  //The html form for creating new tweets
  const createTweetElement = (tweetObj) => {
    const name = tweetObj.user.name;
    const avatar = tweetObj.user.avatars;
    const handle = tweetObj.user.handle;
    const tweetText = tweetObj.content.text;
    const timeStamp = tweetObj.created_at;
    
    let $tweet = `
    <article class="tweets">
      <header class="tweet-header">
        <span class="tweeter-profile">
          <img src=${avatar}> 
          <h2> ${name}</h2>
      </span>
      <span class="userhandle">
      <h2>${handle}</h2>
      </span>
    </header>
      <form></form>
      <div class="tweet-post-content">
        <h2>${tweetText}</h2>
      </div>
      </form>
      <footer>
        <div>
          <p> ${timeago.format(timeStamp)}</p>
        </div>
        <div> 
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`;
    return $tweet;
  };

  //Loads the tweets from the JSON
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      type: 'get',
      success: function(data) {
        renderTweets(data)
      }
    })
  }

  //Animation for the new tweet box to slide down on click
  $(".nav-right").on("click", () => {
    $(".new-tweet").slideToggle();
  });

  //Scrolling listenr for snapping to the top of the page
  window.addEventListener('scroll', (event) => {
    if (window.scrollY > 0) {
      $(".snap-top").css("display", "flex");
    } else {
      $(".snap-top").css("display", "none");
    }
  });
  
  // Snap to the top of page through mouse click
  $(".snap-top").on("click", () => {
    document.documentElement.scrollTop = 0;
  });

  //Looping through all existing arrays to populate the page
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet))
    }
  }

  //Submit handler and redirected POST request
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const input = $(this).find("#tweet-text").val();
    if (input === '' || input === null) {
      $(".error").css("visibility", "visible");
      $(".error").css("opacity", "1");
      $(".error").text("Error: You are not allowed to post an empty Tweet.");
    } else if (input.length > 140) {
      $(".error").css("visibility", "visible");
      $(".error").css("opacity", "1");
      $(".error").text(`Error: You are ${input.length - 140} characters over the tweet limit.`);
    } else {
      $(".error").css("opacity", "0");
      $(".error").css("visibility", "collapse");
      $.post("/tweets", $(this).serialize(), loadTweets)
      document.getElementById("tweet-text").value = '';
    }
  });
  loadTweets();
});
