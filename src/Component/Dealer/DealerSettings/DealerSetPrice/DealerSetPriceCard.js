import React from "react";
import { useHistory } from "react-router-dom";

// css
import "../../../../App.css";

// redux
import { useDispatch } from "react-redux";
import { itemNameReducerActions } from "../../../../Redux/itemNameReducer";

const DealerSetPriceCard = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  return (
    <button
      className="scrap__section__card"
      onClick={() => {
        dispatch(
          itemNameReducerActions.add({
            for: "priceItemName",
            name: props.title,
          })
        );
        history.push("/dealer/settings/setprice/editprice");
      }}
    >
      <img src={props.img} alt="" />
      <p>{props.title[0].toUpperCase() + props.title.slice(1)}</p>
    </button>
  );
};

export default DealerSetPriceCard;
