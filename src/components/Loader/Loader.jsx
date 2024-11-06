import { Spin } from 'antd';
import React, { Component } from 'react';

import './Loader.css';

const contentStyle = {
  height: '100vh',
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

export default class Loader extends Component {
  render() {
    return (
      <div className="loader-section">
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      </div>
    );
  }
}
