//Target post container div
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');

//We need to set a limit of posts per page in the api call

let limit = 10;
let page = 1;

// Fetch the data data from an external api

async function getPosts() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
      );

      //Turn response into json
      const data = await res.json();

      return data;
}

//Render our data into the dom

async function showPosts() {
    const posts = await getPosts();

    //Create an element for each post
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
         <h2 class="post-title">${post.title}</h2>
         <p class="post-body">${post.body}</p>
        </div>

        `;
        postsContainer.appendChild(postEl);
    })
}

// Add loader animation and fetch more posts
function showLoading() {
  loading.classList.add('show');


  //After sometime we will remove the loader
  setTimeout(() => {
    loading.classList.remove('show')

    //Show more post after loader 
    setTimeout(() => {
        page++;
        showPosts();
    }, 300);
  }, 1000)
}

// Return all posts to HTML

showPosts();

//Add an event listener on scroll to trigger loader
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight -5) {
        showLoading();
    }
})