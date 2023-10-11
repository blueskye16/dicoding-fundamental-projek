function main() {
  const baseUrl = "https://api.themoviedb.org/3/";
  const api_key = "623353059db48f17ef551c106c4c2a4c";

  const getMovies = () => {
  fetch(`${baseUrl}/trending/movie/day?${api_key}`)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderMovies(responseJson.books);
      }
    })
    .catch((error) => {
      showResponseMessage(error);
    });
  }

  const renderMovies = (movies) => {
    const listMoviesElement = document.querySelector("movies-item");
    listMoviesElement.innerHTML = "";

    movies.forEach((movie) => {
      listMoviesElement.innerHTML += `
      <div class="tester">
      <img src="${backdrop_path}" class="movies-poster" alt="" srcset="">
      </div>
      `;
    });
  };
}
