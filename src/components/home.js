import React from "react";
import TopNav from "./navbar";
import Login from "./login2";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

const HomePage = ({ match }) => {
  let { path } = useRouteMatch();

  return (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
  );
};

export default HomePage;
