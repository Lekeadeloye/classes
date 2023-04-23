// Helpers
// Call this function to return the current Date and Time
const getNowDateTime = () => new Date().toLocaleString().replace(',','');
// Call this to generate a random post image
const getRandomPostImage = () => `https://picsum.photos/id/${10 + Math.floor(Math.random() * 10)}/1000/800`;

// Variables
const newsFeed = document.querySelector('.news-feed'); // Add posts to this element
const postNew = document.querySelector('.post-new'); // Listen for a click on this button to post
const postNewInput = document.querySelector('.post-new-input'); // This is user message to post

// User data for name and image so the user is consistent 
const userData = {
  username: 'Citizen Person',
  userimg: 'https://randomuser.me/api/portraits/men/22.jpg',
};

// Interpolate the variables into the template
const template = (title, image, time) => {
  return `
      <article class="news-article">
        <header>
          <img class="news-article" src=${userData.userimg} alt="${userData.username}">
          <div>
            <p>${userData.username}</p>
            <p>${time}</p>
          </div>
        </header>
        <img class="news-article-image" src=${image} alt="${userData.username}">
        <div class="news-article-body">
          <p>${title}</p>
        </div>
        <footer>
          <button class="like">
            <i class="fa-solid fa-thumbs-up"></i> 
            <span>Like</span> 
            <span class="count">0</span>
          </button>
          <button class="share">
            <i class="fa-solid fa-share-nodes"></i> 
            <span>Share</span> 
            <span class="count share-count">0</span>
          </button>
        </footer>
        <div class="posted-coments"></div>
        <div class="news-comments">
          <img class="news-comments-img" src="https://randomuser.me/api/portraits/men/22.jpg" alt="${userData.username}">
          <input class="post-comment-input" type="text" placeholder="Write a comment">
          <button class="post-comment">
            <i class="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </article>`;
};


class Article {
  constructor(title, image, time) {
    this.title = title; 
    this.image = image; 
    this.time = time; 
    
    this.likeCount = 0;
    this.shareCount = 0;

    this.init();
  }
  init() {
    this.post = document.createElement("div");
    this.post.innerHTML = template(this.title, this.image, this.time);
    
    // You can access elements in this.post via query selector, example:
    this.like = this.post.querySelector('.like');
    this.share = this.post.querySelector('.share');
    this.comment = this.post.querySelector('.post-comment');
    
    
    
    // You'll need event listeners for Comment, Like and Share
    this.like.addEventListener('click', () => {
      this.updateLike()
    });

    this.share.addEventListener('click', () => {
      this.updateShare()
    });

    this.comment.addEventListener('click', () => {
      this.updateComments()
    });
  }
  updateComments() {

    let comment = this.post.querySelector('.post-comment-input').value
    let commentDiv = this.post.querySelector('.posted-coments')

    // Output the comments to the DOM in a <p> tag

    const newPTag = document.createElement('p')
    newPTag.innerHTML = comment
    

    commentDiv.appendChild(newPTag)

    // Clear the input field
    this.post.querySelector('.post-comment-input').value = ''
  }
  updateLike() {

    console.log('liked', event)
    console.log(this.like.innerText)
    const likeButton = this.like;

    // // Update the like count
    this.likeCount ++;

    // // Add the "active" class name to the Like div

    likeButton.classList = 'active';

    // // Output the like count to the dom

    this.post.querySelector('.count').innerHTML = this.likeCount

  }
  updateShare() {

    const shareButton = this.share;
    // Update the share count

    this.shareCount ++

    // Add the "active" class name to the Share div

    shareButton.classlist = 'active'

    // Output the share count to the dom

    this.post.querySelector('.share-count').innerHTML = this.shareCount
  }
  output() {
    // Output the post to the feed
    postNewInput.value += this.title;
    return this.post;
  }
}


function post() {
  if(postNewInput.value) {
    newsFeed.appendChild(
      new Article(
        postNewInput.value ,
        getRandomPostImage(),
        getNowDateTime()
      ).output()
    )

    // Append the "new Article()" into newsFeed
    // Remember to pass in the "Message", "Random Image" and "Time"
    
    // clear the postNewInput
    postNewInput.value = '';
  }
}

postNew.addEventListener('click', () => post() );