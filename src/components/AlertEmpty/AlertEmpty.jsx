import { Alert, ConfigProvider } from 'antd';
import React, { Component } from 'react';

import './AlertEmpty.css';

export default class AlertEmpty extends Component {
  render() {
    return (
      <div className="alert-empty">
        <ConfigProvider
          theme={{
            components: {
              Alert: {
                defaultPadding: '30px 30px',
              },
            },
          }}
        >
          <Alert type="info" message="Sorry! There is no movie with such name" />
        </ConfigProvider>
      </div>
    );
  }
}
