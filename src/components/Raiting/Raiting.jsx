import { Rate } from 'antd';
import React, { Component } from 'react';

export default class Raiting extends Component {
  handleChange = (value) => {
    const { onRate, id } = this.props;
    onRate(value, id);
  };

  render() {
    const { rate } = this.props;
    return <Rate count={10} allowHalf className="movie-card__stars" onChange={this.handleChange} value={rate} />;
  }
}
