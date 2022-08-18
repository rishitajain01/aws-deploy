import React from "react";

// css
import "../../../Css/DealerHomeCard.css";

const DealerHomeCard = (props) => {
  return (
    <div className="dealer__home__card">
      <h1>{props.title}</h1>
      <p>{props.number}</p>
    </div>
  );
};

export default DealerHomeCard;
