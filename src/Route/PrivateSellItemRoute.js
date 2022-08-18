import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateCustomerRoute = ({ component: Component, ...rest }) => {
  const apiKey = JSON.parse(localStorage.getItem("KTMauth"));
  const gAuth = JSON.parse(localStorage.getItem("KTMgauth"));

  return (
    <Route
      {...rest}
      render={() =>
        apiKey !== null ? (
          apiKey["user"] === "is_customer" ? (
            <Component />
          ) : (
            <Redirect to="/signin" />
          )
        ) : gAuth !== null ? (
          <Component />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateCustomerRoute;
