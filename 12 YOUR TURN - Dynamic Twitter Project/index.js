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
  let user = urlParams.get('user');
  const header = document.querySelector(".header");
  const cover = document.querySelector(".cover");
  const belowCover = document.querySelector(".below-cover");
  const userStats = document.querySelector(".user-stats");
  const tweetsContainer = document.querySelector(".tweets-container");

  user = users.user1;

  header.innerHTML = `
    <div class="user">
      <div class="display-name">${user.displayName}</div>
      <div class="num-tweets">${user.tweets.length} Tweets</div>
    </div>
  `;

  cover.innerHTML = `
    <img src="${user.coverPhotoURL}" />
  `;

  belowCover.innerHTML = `
    <img class="avatar" src="${user.avatarURL}" />
  `;

  userStats.innerHTML = `
    <div class="display-name">${user.displayName}</div>
    <div class="user-name">${user.userName}</div>
    <button class="follow">Following</button>
  `;
}

init();
