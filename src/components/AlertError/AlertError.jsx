import { Alert } from 'antd';
import React, { Component } from 'react';

import './AlertError.css';

export default class AlertError extends Component {
  render() {
    return (
      <div className="alert-error">
        <Alert
          message="Oops! :("
          description="Something unexpectable happens. Check your internet connection or try again later!"
          type="warning"
        />
      </div>
    );
  }
}
