import React from "react";
import Typist from "react-typist";

// css
import "../../App.css";
import "../../Css/Auth.css";

const RightBanner = () => {
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
    </div>
  );
};

export default RightBanner;
