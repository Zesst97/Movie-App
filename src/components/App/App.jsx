import { debounce } from 'lodash';
import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';

import MovieApiServices from '../../services/MovieApiServices';
import AlertError from '../AlertError/AlertError';
import { MovieProvider } from '../Context/Context';
import InputSearch from '../InputSearch/InputSearch';
import Loader from '../Loader/Loader';
import MovieList from '../MovieList/MovieList';
import PaginationList from '../Pagination/Pagination';
import Tab from '../Tab/Tab';

import './App.css';

export default class App extends Component {
  movieApiServices = new MovieApiServices();

  state = {
    movieList: [],
    genresList: [],
    ratedMovies: {},
    inputValue: '',
    isLoading: false,
    isError: false,
    totalMovies: null,
    isInitialLoad: true,
    guestSessionId: null,
    isSearching: true,
    currentPage: undefined,
    windowWidth: window.innerWidth,
  };

  componentDidMount() {
    this.getGuestSessionId();
    this.getMoviesGenres();
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputValue } = this.state;
    if (inputValue !== prevState.inputValue) {
      this.setState({ isLoading: true });
      this.getMovieInfo();
    }
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = debounce(() => {
    this.setState(() => ({
      windowWidth: window.innerWidth,
    }));
  }, 100);

  onError = () => {
    this.setState({
      isLoading: false,
      isError: true,
    });
  };

  getInputValue = (e) => {
    this.setState(() => ({
      inputValue: e.trim(),
    }));
  };

  getGuestSessionId = () => {
    const url = 'authentication/guest_session/new';
    this.movieApiServices.createGuestSession(url).then((data) => {
      const { guest_session_id } = data;
      this.setState({
        guestSessionId: guest_session_id,
      });
    });
  };

  getMovieInfo = (page = 1) => {
    const { inputValue } = this.state;
    const url = `search/movie?query=${inputValue}&include_adult=false&language=en-US&page=${page}`;
    this.movieApiServices
      .getMovie(url)
      .then((movies) => {
        const { results, total_results } = movies;
        this.setState(() => ({
          movieList: results,
          isLoading: false,
          isError: false,
          totalMovies: total_results,
          isInitialLoad: false,
          isSearching: true,
          currentPage: page,
        }));
      })
      .catch(() => this.onError());
  };

  getMoviesGenres = () => {
    this.movieApiServices
      .getGenres()
      .then((genre) => {
        const { genres } = genre;
        const transformedGenres = {};
        genres.forEach((item) => {
          transformedGenres[item.id] = item.name;
        });
        this.setState(() => ({
          genresList: transformedGenres,
        }));
      })
      .catch(() => this.onError());
  };

  rateMovie = (value, id) => {
    const { guestSessionId } = this.state;
    this.movieApiServices.postRate(value, id, guestSessionId);
    this.setState(({ movieList, ratedMovies }) => {
      const filteredMovie = movieList.filter((movie) => movie.id === id);
      const [currentMovie] = filteredMovie;
      const movie = {
        ...ratedMovies,
        [currentMovie.id]: value,
      };
      return {
        ratedMovies: movie,
      };
    });
  };

  getRatedMovieList = (page = 1) => {
    const { guestSessionId } = this.state;
    const url = `guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`;
    this.movieApiServices
      .getRatedMovies(url)
      .then((movies) => {
        const { results, total_results } = movies;
        this.setState(() => ({
          movieList: results,
          isLoading: false,
          isError: false,
          totalMovies: total_results,
          isInitialLoad: false,
          isSearching: false,
          currentPage: page,
        }));
      })
      .catch(() => this.onError());
  };

  render() {
    const pollingOptions = {
      interval: 90000,
    };
    const {
      movieList,
      genresList,
      ratedMovies,
      isLoading,
      isError,
      inputValue,
      totalMovies,
      isInitialLoad,
      isSearching,
      currentPage,
      windowWidth,
    } = this.state;
    const movieCard =
      !isLoading && !isError ? (
        <MovieList
          movieList={movieList}
          genresList={genresList}
          ratedMovies={ratedMovies}
          value={inputValue}
          isInitial={isInitialLoad}
          onRate={this.rateMovie}
          innerWidth={windowWidth}
          isLoading={isLoading}
        />
      ) : null;
    const loaderSpin = isLoading ? <Loader /> : null;
    const errorAlert = isError && !isLoading ? <AlertError /> : null;
    const searching = isSearching ? <InputSearch value={inputValue} onChange={this.getInputValue} /> : null;
    const pages =
      !isLoading && !isError && totalMovies ? (
        <PaginationList
          currentPage={currentPage}
          isSearching={isSearching}
          totalMovies={totalMovies}
          getPageSearch={this.getMovieInfo}
          getPageRated={this.getRatedMovieList}
        />
      ) : null;
    return (
      <section className="app">
        <MovieProvider value={genresList}>
          <div>
            <section className="tab-section">
              <Tab getRated={this.getRatedMovieList} getSearch={this.getMovieInfo} />
            </section>
            <section className="input-search-section">{searching}</section>
            <section className="movie-list-section">
              <Online polling={pollingOptions}>
                {movieCard}
                {loaderSpin}
                {errorAlert}
              </Online>
              <Offline polling={pollingOptions}>{errorAlert}</Offline>
            </section>
          </div>
          <section className="pagination-section">{pages}</section>
        </MovieProvider>
      </section>
    );
  }
}
