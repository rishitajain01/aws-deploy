import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

// component
import App from "./App";

// redux
import { Provider } from "react-redux";
import store from "./Redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
