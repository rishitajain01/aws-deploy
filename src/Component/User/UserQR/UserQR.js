import React, { useEffect, useState } from "react";
import axios from "axios";

// component
import Navbar from "../../Navbar";
import UserProfileSearchbar from "../../UserProfileSearchbar";
import UserProfileNavbar from "../UserProfileNavbar";
import MainFooter from "../../Footer/MainFooter";
import TermFooter from "../../Footer/TermFooter";

// css
import "../../../Css/UserDealerQR.css";
import "../../../App.css";

// api & qr url
import { apiUrl, qrUrl } from "../../../Private";

const UserQR = () => {
  const [userData, setUserData] = useState();

  const apiKey = JSON.parse(localStorage.getItem("KTMauth"));

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get user data
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
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />

      <UserProfileSearchbar />

      <UserProfileNavbar />

      {userData !== undefined ? (
        <div className="user__dealer__qr__section similar__section">
          <h1 className="similar__section__heading">Your QR Code</h1>
          <div className="user__dealer__qr">
            <img src={`${qrUrl}${userData.qr}`} alt="QR Code" />
            <p>{userData.email}</p>
            <h1>{userData.name}</h1>
            <h1>{userData.type}</h1>
          </div>
        </div>
      ) : null}

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default UserQR;
