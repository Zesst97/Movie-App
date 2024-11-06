export default class MovieApiServices {
  movieApiBase = 'https://api.themoviedb.org/3/';

  token = {
    x: 'eyJhbGciOiJIUzI1NiJ9',
    y1: 'eyJhdWQiOiJiZTkwMmJkNTBmMWVhNWI0M2VkYWJiYjdlZjIxOTZhNiIsIm5iZiI6MTcyNzcxMjY3',
    y2: 'NS4zMTk0MjUsInN1YiI6IjY2ZmFjYmIwM2EwZjVhMDhjOGYxOTdlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ',
    z: 'LUo2KwMUQQOj_h10pe7QItT4sBYHTx51RQFENcsp_ck',
  };

  key = '29306f78db422516a56c5ad706db30f0';

  options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${this.token.x}.${this.token.y1}${this.token.y2}.${this.token.z}`,
    },
  };

  async createGuestSession(url) {
    const response = await fetch(`${this.movieApiBase}${url}`, this.options);
    if (!response.ok) {
      throw new Error(`Could not fetch, reseived ${response.status}`);
    }
    const result = await response.json();
    return result;
  }

  async getMovie(url) {
    const response = await fetch(`${this.movieApiBase}${url}`, this.options);
    if (!response.ok) {
      throw new Error(`Could not fetch, reseived ${response.status}`);
    }
    const result = await response.json();
    return result;
  }

  async getGenres() {
    const response = await fetch(`${this.movieApiBase}genre/movie/list?language=en`, this.options);
    if (!response.ok) {
      throw new Error(`Could not fetch, reseived ${response.status}`);
    }
    const result = await response.json();
    return result;
  }

  async postRate(rate, movieId, sessionId) {
    fetch(`${this.movieApiBase}movie/${movieId}/rating?guest_session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this.token.x}.${this.token.y1}${this.token.y2}.${this.token.z}`,
      },
      body: `{"value":${rate}}`,
    })
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => console.error(err));
  }

  async getRatedMovies(url) {
    const response = await fetch(`${this.movieApiBase}${url}`, this.options);
    if (!response.ok) {
      throw new Error(`Could not fetch, reseived ${response.status}`);
    }
    const result = await response.json();
    return result;
  }
}
