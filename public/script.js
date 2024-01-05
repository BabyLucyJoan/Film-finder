const tmdbKey = "5798bdd4bd78b6a45bcc3a1df5226552";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch, {
      method: "GET",
    });

    if (response.ok) {
      const jsonReponse = await response.json();
      const genres = jsonReponse.genres;
      return genres;
    }
  } catch (e) {
    console.log(e.message);
  }
};

const getMovies = async () => {
  try {
    const selectedGenre = getSelectedGenre();
    const discoveryMovieEndpoint = "/discover/movie";
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const urlToFetch = `${tmdbBaseUrl}${discoveryMovieEndpoint}${requestParams}`;
    const response = await fetch(urlToFetch, { method: "GET" });
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  } catch (e) {
    console.log(e);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch, { method: "GET" });
    if (response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;

      return movieInfo;
    }
  } catch (e) {
    console.log(e);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
