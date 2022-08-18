import React from "react";

// css
import "../../Css/DealerContactCard.css";

const DealerContactCard = (props) => {
  const pincode = localStorage.getItem("KTMpincode");

  return (
    <div className="dealer__contact__card">
      <p>
        Name : <span>{props.Name}</span>
      </p>
      <p>
        Contact : <span>{props.Contact}</span>
      </p>
      <p>
        Dealing in :{" "}
        {props.Dealing.map((item, index) => {
          return <span key={index}>{item}, </span>;
        })}
      </p>
      <p>
        Minimum Qty. : <span>{props.Minimum}kg</span>
      </p>
      <p>
        Maximum Qty. : <span>{props.Maximum}kg</span>
      </p>
      <p>
        Timing : <span>8am to 7pm</span>
      </p>
    </div>
  );
};

export default DealerContactCard;
