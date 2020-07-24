import React from "react";
import {Redirect } from "react-router-dom";
import auth from "../../auth";

const LogoutPage = (props) => {
  auth.logout();
  return (
    <Redirect
      to={{
        pathname: "/login",
        state: {
          from: props.location,
        },
      }}
    />
  );
};

export default LogoutPage;
