const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");
let limit = 5;
let page = 1;
// fetch posts from API
async function fetchPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await response.json();
  addedToDom(data);
}
fetchPosts();
// Fetch more Posts and show Loaders
function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      fetchPosts();
    }, 300);
  }, 1000);
}
// Added to the dom elements
function addedToDom(data) {
  data.map((item) => {
    const post = document.createElement("div");
    post.className = "post";
    post.innerHTML = `
      
        <div class="number">${item.id}</div>
        <div class="post-info">
        <h2 class="post-title">${item.title}</h2>
        <p class="post-body">${item.body}<div>
      </div>
      `;

    postsContainer.append(post);
  });
  console.log(data);
}
// InfiniteScrolling
function InfiniteScrolling() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 5) {
    showLoading();
  }
}
// filterPosts
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((item) => {
    const title = item.querySelector(".post-title").innerText.toUpperCase();
    const body = item.querySelector(".post-body").innerText.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
//  Event Listeneres
document.addEventListener("scroll", InfiniteScrolling);
filter.addEventListener("input", filterPosts);
