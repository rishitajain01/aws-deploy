import React from "react";

// css
import "../../../../Css/DealerRequestCategoryCard.css";

const DealerRequestCategoryCard = (props) => {
  return (
    <div className="dealer__request__category__card">
      <img src={props.img} alt="" />
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <span>{props.status}</span>
    </div>
  );
};

export default DealerRequestCategoryCard;
