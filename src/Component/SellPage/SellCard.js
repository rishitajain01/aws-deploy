import React from "react";
import { useHistory } from "react-router-dom";

// css
import "../../App.css";

const SellCard = (props) => {
  const history = useHistory();

  const apiKey = JSON.parse(localStorage.getItem("KTMauth"));
  const gAuth = JSON.parse(localStorage.getItem("KTMgauth"));
  const pincode = localStorage.getItem("KTMpincode");

  return (
    <button
      className="scrap__section__card"
      onClick={() => {
        // if (pincode !== null) {
        //   if (apiKey || gAuth) {
        //     localStorage.setItem("KTMsellItemName", props.title.toLowerCase());
        //     history.push("/sell/sellitem");
        //   } else {
        //     history.push("/signin");
        //   }
        // }
        if (pincode !== null) {
          localStorage.setItem("KTMsellItemName", props.title.toLowerCase());
          history.push("/sell/sellitem");
        }
      }}
    >
      <img src={props.pic} alt="" />
      <p>{props.title[0].toUpperCase() + props.title.slice(1).toLowerCase()}</p>
    </button>
  );
};

export default SellCard;
