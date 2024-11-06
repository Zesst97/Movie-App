import { List } from 'antd';
import React, { Component } from 'react';

import AlertEmpty from '../AlertEmpty/AlertEmpty';
import { MovieConsumer } from '../Context/Context';
import MovieCard from '../MovieCard/MovieCard';
import MovieCardMobile from '../MovieCardMobile/MovieCardMobile';

import './MovieList.css';

export default class MovieList extends Component {
  render() {
    const { movieList, ratedMovies, isInitial, onRate, innerWidth } = this.props;
    const emptyAlert = isInitial || movieList.length !== 0 ? null : <AlertEmpty />;
    const movies =
      movieList.length !== 0 && innerWidth >= 980 ? (
        <List
          grid={{
            gutter: 16,
          }}
          dataSource={movieList}
          renderItem={(item) => (
            <List.Item>
              <MovieConsumer>
                {(genresList) => <MovieCard item={item} ratedMovies={ratedMovies} genres={genresList} onRate={onRate} />}
              </MovieConsumer>
            </List.Item>
          )}
        />
      ) : (
        <List
          grid={{
            gutter: 16,
          }}
          dataSource={movieList}
          renderItem={(item) => (
            <List.Item>
              <MovieConsumer>
                {(genresList) => <MovieCardMobile item={item} ratedMovies={ratedMovies} genres={genresList} onRate={onRate} />}
              </MovieConsumer>
            </List.Item>
          )}
        />
      );
    return (
      <div className="movie-list-container">
        {movies}
        {emptyAlert}
      </div>
    );
  }
}
