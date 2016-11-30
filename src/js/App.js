// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import GrommetApp from 'grommet/components/App';
import HomePage from './components/HomePage';
import '../scss/index.scss';

class App extends React.Component {
  render() {
    return (
      <GrommetApp centered={false}>
        <HomePage />
      </GrommetApp>
    );
  }
}

export default App;
