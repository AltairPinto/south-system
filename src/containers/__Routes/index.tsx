import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { Dashboard } from '..';
// import { PrivateRoute } from '../_PrivateRoute';

export default function Routes() {
  return (
    <Switch>
      {/* <Route exact path="/" component={Home} /> */}
      {/* <PrivateRoute exact path="/:option" component={Home} /> */}
      {/* <PrivateRoute
        exact
        path="/books/find"
        component={}
      /> */}
      <Redirect from="/" to="/home/dashboard" />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
