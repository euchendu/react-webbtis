import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Signup from './containers/Signup';
import Login from './containers/Login';
import DashBoard from './containers/DashBoard';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/login" exact component={Login} />
    <Route path="/dashboard" exact component={DashBoard} />
    <Route component={NotFound} />
  </Switch>
);
