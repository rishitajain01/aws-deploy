import React, { useEffect, useState } from "react";

// component
import DealerProfileSearchbar from "../../DealerProfileSearchbar";
import DealerProfileNavbar from "../../DealerProfileNavbar";
import DealerSetPriceCard from "./DealerSetPriceCard";
import MainFooter from "../../../Footer/MainFooter";
import TermFooter from "../../../Footer/TermFooter";

// css
import "../../../../App.css";

// scrap item data
import { ScrapItemData } from "../../../ScrapItemData";

const DealerSetPrice = () => {
  const [scrapItemData] = useState(ScrapItemData);

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DealerProfileSearchbar />

      <DealerProfileNavbar />

      <div className="dealer__set__price similar__section">
        <h1 className="similar__section__heading" style={{ marginBottom: "0" }}>
          Set Your Price
        </h1>
        <div className="scrap__section">
          {scrapItemData.map((eachData, eachDataIndex) => {
            return (
              <DealerSetPriceCard
                key={eachDataIndex}
                img={eachData.img}
                title={eachData.title}
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

export default DealerSetPrice;
