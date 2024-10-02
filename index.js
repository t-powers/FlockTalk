import { flockData } from "./data.js";

const flockInput = document.getElementById("flock-input");
const flockBtn = document.getElementById("flock-btn");

flockBtn.addEventListener("click", () => {
  console.log(flockInput.value);
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.like) {
    handleLikeClicks(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  }
});

function handleLikeClicks(tweetID) {
  const targetTweetObj = flockData.filter(function (tweet) {
    return tweet.uuid === tweetID;
  })[0];

  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
  } else {
    targetTweetObj.likes++;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;

  renderFeed();
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  } else {
    targetTweetObj.retweets++;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  renderFeed();
}

function getFeedHtml() {
  let feedHtml = ``;
  flockData.forEach(function (flock) {
    feedHtml += `<div class="tweet">
    <div class="tweet-inner">
        <img src="${flock.profilePic}" class="profile-pic"/>
        <div>
            <p class="handle">${flock.handle}</p>
            <p class="tweet-text">${flock.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                  <i class="
                      fa-regular fa-comment-dots" 
                      data-reply=${flock.uuid}>
                  </i>
                  ${flock.replies.length}
                </span>
                <span class="tweet-detail">
                  <i 
                    class="
                      fa-solid fa-heart" 
                      data-like=${flock.uuid}>
                  </i>
                  ${flock.likes}
                </span>
                <span class="tweet-detail">
                  <i class="
                    fa-solid fa-retweet" 
                    data-share=${flock.uuid}>
                  </i>
                  ${flock.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>
`;
  });
  return feedHtml;
}

function renderFeed() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}
renderFeed();
