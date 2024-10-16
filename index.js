import { flockData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
console.log(uuidv4());

const flockInput = document.getElementById("flock-input");
const flockBtn = document.getElementById("flock-btn");

flockBtn.addEventListener("click", () => {
  console.log(flockInput.value);
});

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  }
});

function handleLikeClick(tweetId) {
  const targetTweetObj = flockData.filter(function (tweet) {
    return tweet.uuid === tweetId;
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
  const targetTweetObj = flockData.filter(function (tweet) {
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

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle(`hidden`);
}

function getFeedHtml() {
  let feedHtml = ``;
  flockData.forEach(function (flock) {
    let likeIconClass = "";
    if (flock.isLiked) {
      likeIconClass = "liked";
    }
    let retweetIconClass = "";
    if (flock.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    let repliesHtml = ``;

    if (flock.replies.length > 0) {
      flock.replies.forEach(function (replies) {
        repliesHtml += `
        <div class="tweet-reply">
          <div class="tweet-inner">
              <img src="${replies.profilePic}" class="profile-pic">
                  <div>
                      <p class="handle">${replies.handle}</p>
                      <p class="tweet-text">${replies.tweetText}</p>
                  </div>
          </div>
        </div>
        `;
      });
    }

    feedHtml += `
<div class="tweet">
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
                      fa-solid fa-heart ${likeIconClass}" 
                      data-like=${flock.uuid}>
                  </i>
                  ${flock.likes}
                </span>
                <span class="tweet-detail">
                  <i class="
                    fa-solid fa-retweet ${retweetIconClass}" 
                    data-retweet=${flock.uuid}>
                  </i>
                  ${flock.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${flock.uuid}">
        ${repliesHtml}
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
