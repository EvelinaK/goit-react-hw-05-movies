import axios from 'axios';
const API_KEY = 'c9dbb26251861a1346679dbaca9697b5';

const BASE_URL = 'https://api.themoviedb.org/3/';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
  language: 'en-US',
};

const fetchTrendingMovies = async () => {
  try {
    const config = {
      url: `trending/movie/week`,
    };

    const { data } = await axios(config);
    // console.log(data.results);
    return data.results;
  } catch (error) {
    new Error('No response from server');
  }
};

async function fetchMovieDetails(movie_id) {
  try {
    const config = {
      url: `movie/${movie_id}`,
    };

    const { data } = await axios(config, movie_id);
    return data;
  } catch (error) {
    new Error('No response from server');
  }
}
async function fetchMovieCast(movie_id) {
  try {
    const config = {
      url: `movie/${movie_id}/credits`,
    };

    const { data } = await axios(config, movie_id);
    return data.cast;
  } catch (error) {
    new Error('No response from server');
  }
}

async function fetchMovieReviews(movie_id) {
  try {
    const config = {
      url: `movie/${movie_id}/reviews`,
    };

    const { data } = await axios(config, movie_id);
    return data.results;
  } catch (error) {
    new Error('No response from server');
  }
}

async function fetchMoviesByQuery(query) {
  try {
    const config = {
      url: `search/movie`,
      params: {
        query,
      },
    };

    const { data } = await axios(config);
    return data.results;
  } catch (error) {
    new Error('No response from server');
  }
}

// async function fetchMoviesByQuery(name) {
//   return fetch(
//     `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${name}&language=en-US&page=1&include_adult=false`,
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//   });
// }

export default {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
  fetchMoviesByQuery,
};
