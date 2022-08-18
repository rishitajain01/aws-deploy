import React from "react";
import { NavLink } from "react-router-dom";
import Typist from "react-typist";
import Swal from "sweetalert2";

// css
import "../../App.css";
import "../../Css/Auth.css";

const LeftBanner = () => {
  return (
    <div className="banner">
      <Typist
        className="typist"
        cursor={{
          show: false,
        }}
      >
        <h1>
          "Be a part of solution,
          <br />
          not a part of pollution."
        </h1>
      </Typist>
      <NavLink to="/signin/signup" className="banner__button">
        Sign Up
      </NavLink>
      {/* <button
        className="banner__button"
        onClick={() => {
          Swal.fire({
            title: "Sign Up feature will be live soon.",
            confirmButtonColor: "#56b124",
          });
        }}
      >
        Sign Up
      </button> */}
    </div>
  );
};

export default LeftBanner;
