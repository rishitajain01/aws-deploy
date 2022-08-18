import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateAnotherRoute = ({ component: Component, ...rest }) => {
  const apiKey = JSON.parse(localStorage.getItem("KTMauth"));

  return (
    <Route
      {...rest}
      render={() =>
        apiKey !== null ? (
          apiKey["user"] === "is_customer" ? (
            <Component />
          ) : (
            <Redirect to="/dealer/home" />
          )
        ) : (
          <Component />
        )
      }
    />
  );
};

export default PrivateAnotherRoute;
