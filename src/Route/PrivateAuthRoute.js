import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateAuthRoute = ({ component: Component, ...rest }) => {
  const apiKey = JSON.parse(localStorage.getItem("KTMauth"));

  return (
    <Route
      {...rest}
      render={() =>
        apiKey === null ? (
          <Component />
        ) : apiKey["user"] === "is_customer" ? (
          <Redirect to="/sell/user/profile" />
        ) : (
          <Redirect to="/dealer/home" />
        )
      }
    />
  );
};

export default PrivateAuthRoute;
