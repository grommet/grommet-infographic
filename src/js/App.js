// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import GrommetApp from 'grommet/components/App';

import Nav from './components/Nav';
import HomePage from './components/HomePage';

class App extends React.Component {
  render() {
    return (
      <GrommetApp centered={false}>
      	<Nav />
        <HomePage />
      </GrommetApp>
    );
  }
}

export default App;
