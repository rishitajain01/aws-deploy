import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// css
import "../../../../Css/DealerEditPrice.css";
import "../../../../App.css";

// component
import DealerProfileSearchbar from "../../DealerProfileSearchbar";
import DealerProfileNavbar from "../../DealerProfileNavbar";
import DealerEditPriceCard from "./DealerEditPriceCard";
import MainFooter from "../../../Footer/MainFooter";
import TermFooter from "../../../Footer/TermFooter";

// redux
import { useSelector } from "react-redux";

// dealer edit price item data
import { DealerEditPriceItemData } from "./DealerEditPriceItemData";

const DealerEditPrice = () => {
  const priceItemName = useSelector(
    (state) => state.itemNameReducer.priceItemName
  );

  const [dealerEditPriceItemData] = useState(DealerEditPriceItemData);

  const history = useHistory();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DealerProfileSearchbar />

      <DealerProfileNavbar />

      <div className="dealer__edit__price similar__section">
        <h1 className="similar__section__heading">
          Set Price For{" "}
          {priceItemName !== ""
            ? priceItemName[0].toUpperCase() + priceItemName.slice(1)
            : "All"}{" "}
          Category
        </h1>
        <button
          onClick={() => {
            history.push("/dealer/settings/setprice/editprice/pricelist");
          }}
        >
          Price List
        </button>

        <div className="edit__price">
          {dealerEditPriceItemData.map((eachData, eachDataIndex) => {
            return (
              <DealerEditPriceCard
                key={eachDataIndex}
                img={eachData.img}
                name={eachData.name}
                pincodeDetails={eachData.pincodeDetails}
              />
            );
          })}
        </div>
      </div>

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default DealerEditPrice;
