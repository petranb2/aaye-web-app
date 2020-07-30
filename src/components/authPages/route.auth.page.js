import React, { useState, useEffect } from "react";
import auth from "../../auth";
import Template from "./template.auth.page";
import { Redirect, useRouteMatch } from "react-router-dom";
import { Spinner } from "reactstrap"
import {
  useHistory
} from "react-router-dom";

const RouteAuthPage = (props) => {
  let { path } = useRouteMatch();
  const history = useHistory();
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
      <Template path={path} history={history}/>
    );
  }
};

export default RouteAuthPage;
