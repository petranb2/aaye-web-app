import React, { useState, useEffect } from "react";
import TopNav from "../navbar";
import auth from "../../auth";
import IndexPage from "./index.auth.page";
import LogoutPage from "./logout.auth.page";
import Users from "./users.auth.page";
import NewUser from "./newUser.auth.page"
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import {Spinner} from "reactstrap"

const RouteAuthPage = (props) => {
  let { path } = useRouteMatch();

  let [loggedIn, setloggedIn] = useState(false);
  let [loading, setloading] = useState(true);

  useEffect(() => {
    auth.isAuthenticated((authenticated) => {
      setloggedIn(authenticated);
      setloading(false);
    });
  });

  if (loading) {
    return (
    <div>
    <p>Check auth</p> 
    <Spinner type="grow" color="primary" />
    <Spinner type="grow" color="primary" />
    <Spinner type="grow" color="primary" />
    <Spinner type="grow" color="primary" />
    <Spinner type="grow" color="primary" />
    </div>);
  } else {
    if (!loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <TopNav />
        <Switch>
          <Route path={`${path}/logout`}>
            <LogoutPage />
          </Route>
          <Route path={`${path}/users`}>
            <Users />
          </Route>
          <Route path={`${path}/newUser`}>
            <NewUser />
          </Route>
          <Route path={path}>
            <IndexPage />
          </Route>
        </Switch>
      </div>
    );
  }
};

export default RouteAuthPage;
