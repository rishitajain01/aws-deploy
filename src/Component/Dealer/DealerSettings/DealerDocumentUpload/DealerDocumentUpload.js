import React, { useEffect, useState } from "react";
import axios from "axios";

// css
import "../../../../Css/DealerDocumentUpload.css";
import "../../../../App.css";

// component
import DealerProfileSearchbar from "../../DealerProfileSearchbar";
import DealerProfileNavbar from "../../DealerProfileNavbar";
import KabadiDocumentUpload from "./KabadiDocumentUpload";
import CollectorDocumentUpload from "./CollectorDocumentUpload";
import RecyclerDocumentUpload from "./RecyclerDocumentUpload";
import MainFooter from "../../../Footer/MainFooter";
import TermFooter from "../../../Footer/TermFooter";

// api url
import { apiUrl } from "../../../../Private";

const DealerDocumentUpload = () => {
  const [dealerData, setDealerData] = useState();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get dealer data
  useEffect(() => {
    const apiKey = JSON.parse(localStorage.getItem("KTMauth"));
    const profileUrl = `${apiUrl}/users/profile/`;
    const config = {
      headers: {
        Authorization: `Token ${apiKey["key"]}`,
      },
    };

    axios
      .get(profileUrl, config)
      .then((response) => {
        setDealerData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <DealerProfileSearchbar />

      <DealerProfileNavbar />

      <div className="dealer__document__upload__section similar__section">
        <h1 className="similar__section__heading">Upload Your Documents</h1>
        {(() => {
          if (dealerData !== undefined) {
            if (dealerData.type === "kabadiwala") {
              return <KabadiDocumentUpload />;
            } else if (dealerData.type === "collector") {
              return <CollectorDocumentUpload />;
            } else if (dealerData.type === "recycler") {
              return <RecyclerDocumentUpload />;
            }
          }
        })()}
      </div>

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default DealerDocumentUpload;
