import React from "react";

// css
import "../../Css/UserDealerPickupCard.css";

// image
import pickup__truck from "../../Image/pick-up-truck.png";

const UserDealerPickupCard = (props) => {
  return (
    <div className="user__dealer__pickup__card">
      <div className="left__side">
        <img src={pickup__truck} alt="" />
      </div>
      <div className="right__side">
        <p>
          Unique ID : <span>{props.uniqueId}</span>
        </p>
        <p>
          On : <span>{props.date}</span>
        </p>
        <p>
          At : <span>{props.time}</span>
        </p>
        <p>
          Status : <span>{props.status}</span>
        </p>
      </div>
    </div>
  );
};

export default UserDealerPickupCard;
