import React from "react";

// css
import "../../../../Css/DealerAreaCard.css";

const DealerAreaCard = (props) => {
  return (
    <div className="dealer__area__card">
      <h1>{props.pincode}</h1>
      <p>
        State : <span>{props.state}</span>
      </p>
      <p>
        City : <span>{props.city}</span>
      </p>
      <p>
        Area : <span>{props.area}</span>
      </p>
      <button onClick={props.deleteArea}>Delete Area</button>
    </div>
  );
};

export default DealerAreaCard;
