import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Home from './containers/HomePage';

const rootPath = '/';

const onRouteUpdate = function () {
  let docElements = document.querySelectorAll('.article');
  if (docElements.length > 0 && window.location.hash === '') {
    docElements[0].scrollTop = 0;
  }
};

class GrommetApp extends React.Component {
  constructor(props) {
    super(props);

    this.constructor.childContextTypes = {
      routePrefix: React.PropTypes.string.isRequired
    };
  }

  getChildContext() {
    return {
      routePrefix: rootPath
    };
  }

  render() {
    return (
      <App {...this.props} />
    );
  }
};

const routes = (
  <Router onUpdate={onRouteUpdate} history={browserHistory} >
    <Route path={rootPath} component={GrommetApp}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

export default routes;
