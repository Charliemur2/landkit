/* NAVBAR */
/* getting elements */
const navBar = document.querySelector('.js-navbar');
const header = document.querySelector('.js-header');
const menuBtn = document.querySelector('.js-hamburguer-btn');
const closeBtn = document.querySelector('.js-x-btn');

/* active item on navbar */
let navItem = document.querySelectorAll('.js-navbar-item');
navItem.forEach(item => {
  item.addEventListener('click', function() {
    navItem.forEach(navItem => navItem.classList.remove('navbar__item--active'));
    this.classList.add('navbar__item--active');
  });
});

/* scrolled menu */
window.onscroll = function() {
  if(window.pageYOffset > 80) {
    header.classList.add('header--scrolled');
    menuBtn.classList.add('hamburger-btn--scrolled');
    closeBtn.classList.add('x-btn--scrolled');

    if(!scrolled) {
      header.style.transform = 'translateY(-70px)';
    }
    setTimeout(function() {
      header.style.transform = 'translate(0)';
      scrolled = true;
    }, 500)
  } else {
    header.classList.remove('header--scrolled');
    menuBtn.classList.remove('hamburger-btn--scrolled');
    closeBtn.classList.remove('x-btn--scrolled');
    scrolled = false;
  }
};

/* click on hamburger menu */
function showMenu() {
  if (navBar.classList.contains('navbar', 'js-navbar')) {
    menuBtn.classList.add('hamburger-btn--clicked');
    closeBtn.classList.add('x-btn');
    closeBtn.classList.remove('x-btn--clicked');
    navBar.classList.remove('navbar');
    navBar.classList.add('navbar--mobile');
    disableScroll();
  } else {
    menuBtn.classList.remove('hamburger-btn--clicked');
    closeBtn.classList.remove('x-btn');
    closeBtn.classList.add('x-btn--clicked');
    navBar.classList.remove('navbar--mobile');
    navBar.classList.add('navbar');
    enableScroll();
  }
}

/* disable and enable srolling */
function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.querySelector('html').scrollTop = window.scrollY;
}

function enableScroll() {
  document.body.style.overflow = null;
}
/* FETCHING DATA */
let i = 6;
const container = document.querySelector('.js-blogs');
const searchForm = document.querySelector('.js-search');
const loadMoreBtn = document.querySelector('.js-load-more');
const searchBtn = document.querySelector('.js-search-btn');
/* function loadMore() {
  i += 3;
  renderPosts();  
} */
const favoriteIds = localStorage.getItem('FAVORITESIDS');
console.log(favoriteIds);
arrayIds = Array.from(favoriteIds).map( elemento => parseFloat(elemento));
arrayIds = arrayIds.filter(Number);
console.log(arrayIds);
const renderPosts = async (term) => {
  let uri = "https://landkitdb.herokuapp.com/posts";
  if (localStorage.OUTTERM !== 'null') {
    uri += `?q=${localStorage.OUTTERM}`;
  } else if (term) {
    uri += `?q=${term}`;
  }
  const res = await fetch(uri);
  const posts = await res.json();
  if (posts.length === 0) {
    window.location.href='./not-found.html';
  }
  /* if (i > posts.length) {
    loadMoreBtn.classList.add('load-more--disable');
  } */

  localStorage.setItem('OUTTERM', null);
  let template = '';
  posts.forEach(post => {
    for (let i = 0; i < arrayIds.length; i++){
      if (post.id === arrayIds[i]) {
        console.log(post.id);
        template += `
          <a href="./../details.html?id=${post.id}">
            <div class="post" role="card">
              <div class="star js-favorites" onclick="getFavoritesIds()">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="star__img"fill-rule="evenodd" clip-rule="evenodd" d="M16 6.20038C16 6.38185 15.875 6.55325 15.75 6.68431L12.2596 10.2533L13.0865 15.2943C13.0962 15.3648 13.0962 15.4253 13.0962 15.4959C13.0962 15.758 12.9808 16 12.7019 16C12.5673 16 12.4327 15.9496 12.3173 15.879L8 13.4997L3.68269 15.879C3.55769 15.9496 3.43269 16 3.29808 16C3.01923 16 2.89423 15.758 2.89423 15.4959C2.89423 15.4253 2.90385 15.3648 2.91346 15.2943L3.74038 10.2533L0.240385 6.68431C0.125 6.55325 0 6.38185 0 6.20038C0 5.89792 0.298077 5.77694 0.538462 5.73661L5.36538 5.00063L7.52885 0.413359C7.61538 0.221802 7.77885 0 8 0C8.22115 0 8.38462 0.221802 8.47115 0.413359L10.6346 5.00063L15.4615 5.73661C15.6923 5.77694 16 5.89792 16 6.20038Z" fill="#B4C2D3"/>
                </svg>
              </div>
              <div class="post__img">
                <img class="post__img-item" src="${post.img.picture}" alt="article photo" role="img"/>
              </div>
              <div class="post__body">
                <h3 class="post__title" role="text">${post.title}</h3>
                <p class="post__content" role="text">${post.content.slice(0, 80)}...</p>
                <div class="post__author">
                  <img class="post__author-photo" src="${post.author.photo}" alt="article photo" role="img"/>
                  <p class="post__author-name" role="text">${post.author.name}</p>
                  <p class="post__date" role="text">${post.pubDate}</p>
                </div>
              </div>
            </div>
          </a>
        ` 
      }
    }
  });
  

  container.innerHTML = template;
}

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
});


window.addEventListener('DOMContentLoaded', () => renderPosts());

