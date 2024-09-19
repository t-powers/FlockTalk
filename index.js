import { flockData } from "./data.js";

const flockInput = document.getElementById("flock-input");
const flockBtn = document.getElementById("flock-btn");
const feed = document.getElementById("feed");

flockBtn.addEventListener("click", () => {
  console.log(flockInput.value);
});

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
                    ${flock.replies.length}
                </span>
                <span class="tweet-detail">
                    ${flock.likes}
                </span>
                <span class="tweet-detail">
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

function renderFeed() {}
