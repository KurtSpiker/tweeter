$(document).ready(function() {  
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

  const data = [
    {
    "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
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
  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
        $("#tweets-container").append(createTweetElement(tweet))
    }
  }
  renderTweets(data);

  $("#new-tweet-form" ).submit(function(event) {
    event.preventDefault();
    $.post("/tweets", $(this).serialize()) 
  });
});
