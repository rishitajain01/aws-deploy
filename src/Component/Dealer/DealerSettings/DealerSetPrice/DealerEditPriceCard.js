import React from "react";
import Swal from "sweetalert2";

// css
import "../../../../Css/DealerPriceItemCard.css";

const DealerEditPriceCard = (props) => {
  // set price
  const setPrice = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "The price has been set successfully",
      confirmButtonColor: "#56b124",
    });
  };

  return (
    <form className="dealer__price__item__card" onSubmit={setPrice}>
      <div className="details__section">
        <div className="img">
          <img src={props.img} alt="" />
        </div>
        <div className="details">
          <h1>{props.name[0].toUpperCase() + props.name.slice(1)}</h1>
          <p>Set area price</p>
          <div className="check__all">
            <input type="checkbox" />
            <p>Set same price for all area pincode</p>
          </div>
          {props.pincodeDetails.map((eachDetail, eachDetailIndex) => {
            return (
              <div className="price__section" key={eachDetailIndex}>
                <h1>{eachDetail.pincode}</h1>
                <input
                  type="text"
                  placeholder={eachDetail.priceIn}
                  name={eachDetailIndex}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="action__section">
        <div className="agree">
          <input type="checkbox" required />
          <p>Kabadi Techno Commission 1% Per/kg</p>
        </div>
        <button type="submit">Set Price</button>
      </div>
    </form>
  );
};

export default DealerEditPriceCard;
