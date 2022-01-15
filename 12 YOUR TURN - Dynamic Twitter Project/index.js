const users = {
  user1: {
    userName: '@elonmusk',
    displayName: 'Elon Musk',
    joinedDate: 'June 2009',
    followingCount: 103,
    followerCount: 47900000,
    avatarURL: 'assets/elonmusk.jpg',
    coverPhotoURL: 'assets/elonmusk-cover.jpeg',
    tweets: [
      {
        text: 'I admit to judging books by their cover',
        timestamp: '2/10/2021 00:01:20'
      },
      {
        text: 'Starship to the moon',
        timestamp: '2/09/2021 18:37:12'
      },
      {
        text: 'Out on launch pad, engine swap underway',
        timestamp: '2/09/2021 12:11:51'
      }
    ]
  },
  user2: {
    userName: '@BillGates',
    displayName: 'Bill Gates',
    joinedDate: 'June 2009',
    followingCount: 274,
    followerCount: 53800000,
    avatarURL: 'assets/billgates.jpg',
    coverPhotoURL: 'assets/billgates-cover.jpeg',
    tweets: [
      {
        text: 'Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/',
        timestamp: '2/10/2021 00:01:20'
      },
      {
        text: 'Should I start tweeting memes? Let me know in a comment.',
        timestamp: '2/09/2021 18:37:12'
      },
      {
        text: 'In 2020, I read a book every hour.',
        timestamp: '2/09/2021 12:11:51'
      }
    ]
  }
};

function init() {
  const urlParams = new URLSearchParams(window.location.search);
  let user = users[urlParams.get('user')];
  const header = document.querySelector(".header");
  const cover = document.querySelector(".cover");
  const belowCover = document.querySelector(".below-cover");
  const userStats = document.querySelector(".user-stats");
  const tweetsContainer = document.querySelector(".tweets-container");

  user = user === undefined ? users.user1 : user;

  header.innerHTML = `
    <div class="user">
      <div class="display-name">${user.displayName}</div>
      <div class="num-tweets">${formatNum(user.tweets.length)} Tweets</div>
    </div>
  `;

  cover.innerHTML = `
    <img src="${user.coverPhotoURL}" />
  `;

  const avatarImg = document.createElement('img');
  avatarImg.classList = "avatar";
  avatarImg.src = user.avatarURL;
  belowCover.prepend(avatarImg);

  userStats.innerHTML = `
    <div class="display-name">${user.displayName}</div>
    <div class="user-name">${user.userName}</div>    
    <div class="joined-date">Joined ${user.joinedDate}</div>
    <div class="follow-div">
      <span class="following">${formatNum(user.followingCount)}</span> Following
      <span class="followers">${formatNum(user.followerCount)}</span> ${formatNum(user.followerCount) === '1' ? 'Follower' : 'Followers'}
    </div>
  `;

  for (const tweet of user.tweets) {
    const tweetDiv = document.createElement('div');
    tweetDiv.classList.add('tweet');

    tweetDiv.innerHTML = `
      <div class="tweet-avatar"><img src="${user.avatarURL}"></div>
      <div>
        <div class="tweet-author">
          <span class="tweet-display-name">${user.displayName}</span>
          <span class="tweet-username-time">${user.userName} · ${tweetPostTime(tweet.timestamp)}</span>
        </div>
        <div class="tweet-text">${tweet.text}</div>
      </div>
    `;

    tweetsContainer.appendChild(tweetDiv);
  }
}

function formatNum(num) {
  if (num < 1_000) return `${num}`;
  else if (num < 10_000) return `${num.toLocaleString()}`;
  else if (num < 1_000_000) return `${magnitudeFormat(num, 1)}k`;
  else if (num < 1_000_000_000) return `${magnitudeFormat(num, 2)}M`;
  else return `Too much`;
}

function magnitudeFormat(num, magnitude) {
  // return (num / (1000 ** magnitude)).toFixed(1); // Rounds up above 5
  return Math.floor((num / 1000 ** magnitude) * 10) / 10; // Rounds down
}

function tweetPostTime(timestamp) {
  let time = null;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const postingDate = new Date(timestamp);
  const postingDateInSeconds = Date.parse(timestamp);
  const secondsSincePosting = Math.floor((Date.now() - postingDateInSeconds) / 1000);

  if (secondsSincePosting >= ( 3600 * 24 )) { // 1 day or more
    const postingYear = postingDate.getFullYear();
    const currentYear = new Date(Date.now()).getFullYear();

    time = `${ months[postingDate.getMonth()] } ${ postingDate.getDate() }`;

    if (postingYear !== currentYear) {  // Last year
      time += `, ${postingYear}`;
    }
  } else if (secondsSincePosting >= 3600 ) { // Less than 1 day, more than 1 hour
    time = `${ Math.floor(secondsSincePosting / 3600 ) }h`;
  } else if (secondsSincePosting >= 60 ) {   // Less than 1 hour, more than 1 minute
    time = `${ Math.floor(secondsSincePosting / 60 ) }m`;
  } else {
    time = `${ secondsSincePosting }s`; // Less than 1 minute
  }

  return time;
}

init();