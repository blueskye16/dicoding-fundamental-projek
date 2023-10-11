const api_key = "api_key=623353059db48f17ef551c106c4c2a4c";
const baseUrl = "https://api.themoviedb.org/3/";
const imgUrl = "https://image.tmdb.org/t/p/w500/";
const tmdbMovie = "https://www.themoviedb.org/movie/";
const formEl = document.querySelector(".card-body");
let page = 1;

function getMovies(inputData) {
  const srcUrl = `${baseUrl}search/movie?query=${inputData}&page=${page}&${api_key}`;
  
  fetch(srcUrl)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errors) {
        showResponseMessage(responseJson.errors);
      } else {
        renderAllMovies(responseJson.results);
      }
    })
    .catch((error) => {
      showResponseMessage(error.message);
    });
}

function renderAllMovies(movies) {
  const moviesEl = document.querySelector(".src-results");
  moviesEl.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, id } = movie;
    moviesEl.innerHTML += `
      <div class="src-result">
        <img src="${imgUrl + poster_path}" alt="${title}">
        <a href="${tmdbMovie + id}" target="_blank">${title}</a>
      </div>
    `;
  });
}

function showResponseMessage(message = "Check your internet connection") {
  alert(message);
}

function main() {
  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputData = document.querySelector("#inputMovieTitle").value;
    getMovies(inputData);
  });
}

function smoothScrollTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

// toTop of page
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// ngilangin konteks input
$(".clearable").each(function() {
  
  const $inp = $(this).find("input:text"),
      $cle = $(this).find(".clearable__clear");

  $inp.on("input", function(){
    $cle.toggle(!!this.value);
  });
  
  $cle.on("touchstart click", function(e) {
    e.preventDefault();
    $inp.val("").trigger("input");
  });
  
});

main();
