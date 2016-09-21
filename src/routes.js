import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Ivenues from './Ivenues';
import Home from './components/Home';

const rootPath = '/';

const onRouteUpdate = function () {
  let docElements = document.querySelectorAll('.article');
  if (docElements.length > 0 && window.location.hash === '') {
    docElements[0].scrollTop = 0;
  }
};

class IvenuesSection extends React.Component {
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
      <Ivenues {...this.props} />
    );
  }
};

const routes = (
  <Router onUpdate={onRouteUpdate} history={browserHistory} >
    <Route path={rootPath} component={IvenuesSection}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

export default routes;
