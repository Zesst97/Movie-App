import { Badge, Card, Space, Typography } from 'antd';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import React, { Component } from 'react';

import Raiting from '../Raiting/Raiting';

import './MovieCardMobile.css';
import defaultPoster from './no_poster.jpg';

const { Title, Text } = Typography;

export default class MovieCardMobile extends Component {
  posterBase = 'https://image.tmdb.org/t/p/w500';

  stylesCardMobile = {
    body: {
      width: '376px',
      height: 'auto',
      padding: 0,
    },
  };

  stylesSpace = {
    item: {
      width: '100%',
      height: '100%',
      padding: '0px',
      margin: '0px',
      rowGap: '0px',
    },
  };

  rateStyles = {
    base: 'movie-card__rate',
    lowest: 'movie-card__rate--lowest',
    low: 'movie-card__rate--low',
    middle: 'movie-card__rate--middle',
    high: 'movie-card__rate--high',
    highest: 'movie-card__rate--highest',
  };

  getDateFormat = () => {
    const { item } = this.props;
    const numberedDatesArr = item.release_date
      .split('-')
      .map((date) => Number(date))
      .join(' ');
    const formatDate = format(new Date(numberedDatesArr), 'MMMM dd, uuuu');
    return formatDate;
  };

  getGenresNames = () => {
    const { item, genres } = this.props;
    const genreNames = item.genre_ids.map((id) => genres[id]);
    return genreNames;
  };

  getCuttedDescription = () => {
    const { item } = this.props;
    const cuttedOverview = item.overview.split('');
    if (item.overview.length >= 170) {
      const newOverview = `${cuttedOverview.slice(0, 170).join('')}...`;
      return newOverview;
    }
    return item.overview;
  };

  getClasses = () => {
    const { item } = this.props;
    let rateClass = '';
    if (item.vote_average < 3) {
      rateClass = `${this.rateStyles.base} ${this.rateStyles.lowest}`;
    } else if (item.vote_average >= 3 && item.vote_average < 5) {
      rateClass = `${this.rateStyles.base} ${this.rateStyles.low}`;
    } else if (item.vote_average >= 5 && item.vote_average < 7) {
      rateClass = `${this.rateStyles.base} ${this.rateStyles.middle}`;
    } else if (item.vote_average >= 7 && item.vote_average < 10) {
      rateClass = `${this.rateStyles.base} ${this.rateStyles.high}`;
    } else {
      rateClass = `${this.rateStyles.base} ${this.rateStyles.highest}`;
    }
    return rateClass;
  };

  render() {
    const { item, onRate, ratedMovies } = this.props;
    const formatDate = this.getDateFormat();
    const genresCollection = this.getGenresNames().map((genre) => <Badge key={nanoid()} count={genre} color="#D3D3D3" />);
    const myRaiting = ratedMovies[item.id] ?? 0;
    const overview = this.getCuttedDescription();
    const { vote_average, poster_path, id } = item;
    const rateClass = this.getClasses();
    return (
      <Card hoverable className="movie-card" styles={this.stylesCardMobile}>
        <Space direction="vertical" className="movie-card__first-space" styles={this.stylesSpace}>
          <Space direction="horizontal" className="movie-card__second-space" styles={this.stylesSpace}>
            <img
              className="movie-card__poster"
              alt="example"
              src={item.poster_path === null ? defaultPoster : `${this.posterBase}${poster_path}`}
            />
            <Space direction="vertical" styles={this.stylesSpace}>
              <div className="movie-card__title">
                <Title level={4} className="movie-card__name">
                  {item.title}
                </Title>
              </div>
              <Text type="secondary" className="movie-card__date">
                {formatDate}
              </Text>
              <p className="movie-card__genre">{genresCollection}</p>
            </Space>
            <div className={rateClass}>{vote_average === 10 ? vote_average.toFixed(0) : vote_average.toFixed(1)}</div>
          </Space>
          <section className="movie-card__main-info">
            <Text className="movie-card__description">{overview}</Text>
            <Raiting id={id} onRate={onRate} rate={myRaiting} />
          </section>
        </Space>
      </Card>
    );
  }
}
