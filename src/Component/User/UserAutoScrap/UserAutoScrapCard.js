import React from "react";

// css
import "../../../App.css";

const UserAutoScrapCard = (props) => {
  return (
    <button className="scrap__section__card" onClick={props.autoScrapService}>
      <img src={props.img} alt="" />
      <p>{props.title[0].toUpperCase() + props.title.slice(1)}</p>
    </button>
  );
};

export default UserAutoScrapCard;
