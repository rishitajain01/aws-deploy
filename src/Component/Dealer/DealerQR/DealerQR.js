import React, { useState, useEffect } from "react";
import axios from "axios";

// component
import DealerProfileSearchbar from "../DealerProfileSearchbar";
import DealerProfileNavbar from "../DealerProfileNavbar";
import MainFooter from "../../Footer/MainFooter";
import TermFooter from "../../Footer/TermFooter";

// css
import "../../../Css/UserDealerQR.css";
import "../../../App.css";

// api & qr url
import { apiUrl, qrUrl } from "../../../Private";

const DealerQR = () => {
  const [dealerData, setDealerData] = useState();

  const apiKey = JSON.parse(localStorage.getItem("KTMauth"));

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get dealer data
  useEffect(() => {
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

      {dealerData !== undefined ? (
        <div className="user__dealer__qr__section similar__section">
          <h1 className="similar__section__heading">Your QR Code</h1>
          <div className="user__dealer__qr">
            <img src={`${qrUrl}${dealerData.qr}`} alt="QR Code" />
            <p>{dealerData.email}</p>
            <h1>{dealerData.name}</h1>
            <h1>{dealerData.type}</h1>
          </div>
        </div>
      ) : null}

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default DealerQR;
