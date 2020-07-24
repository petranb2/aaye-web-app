import React from "react";
import TopNav from "./navbar";
import Login from "./login";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

const HomePage = ({ match }) => {
  let { path } = useRouteMatch();

  return (
    <div>
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
    </div>
  );
};

export default HomePage;
