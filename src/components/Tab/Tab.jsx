import React from 'react';
import { Tabs } from 'antd';

import './tab.css';

class Tab extends React.Component {
  items = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ];

  onChange = (key) => {
    const { getRated, getSearch } = this.props;
    if (key === '1') {
      getSearch();
    }
    if (key === '2') {
      getRated();
    }
  };

  render() {
    return <Tabs defaultActiveKey="1" items={this.items} onChange={this.onChange} centered />;
  }
}

export default Tab;
