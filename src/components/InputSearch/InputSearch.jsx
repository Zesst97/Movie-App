import { Input } from 'antd';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';

import './InputSearch.css';

export default class InputSearch extends Component {
  handleChange = debounce((event) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  }, 800);

  render() {
    return <Input placeholder="Type to search..." size="large" onChange={this.handleChange} />;
  }
}
