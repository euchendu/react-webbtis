import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import NotFound from './containers/NotFound';
import SignUpPage from './containers/Signup';

export default ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signup" exact component={SignUpPage} />
    <Route component={NotFound} />
  </Switch>
);
