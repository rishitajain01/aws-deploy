import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

// css
import "../../../Css/UserDealerProfile.css";

// component
import DealerProfileSearchbar from "../DealerProfileSearchbar";
import DealerProfileNavbar from "../DealerProfileNavbar";
import MainFooter from "../../Footer/MainFooter";
import TermFooter from "../../Footer/TermFooter";

// material icon
import DescriptionIcon from "@material-ui/icons/Description";
import CropFreeIcon from "@material-ui/icons/CropFree";

// image
import customer__profile__img from "../../../Image/customer__profile__img.PNG";

// api url
import { apiUrl } from "../../../Private";

const DealerProfile = () => {
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
        <div className="user__dealer__profile">
          <div className="left__side">
            <img src={customer__profile__img} alt="" />
            <NavLink
              className="user__dealer__profile__edit__link"
              to="/dealer/profile/profileedit"
            >
              Edit
            </NavLink>
          </div>
          <div className="right__side">
            <p>
              Name : <span>{dealerData.name}</span>
            </p>
            <p>
              Email ID : <span>{dealerData.email}</span>
            </p>
            <p>
              Mobile Number : <span>{dealerData.mobile}</span>
            </p>
            <p>
              Pincode : <span>{dealerData.area_pin}</span>
            </p>
            <p>
              State : <span>{dealerData.state}</span>
            </p>
            <p>
              City : <span>{dealerData.city}</span>
            </p>
            <p>
              Address : <span>{dealerData.address}</span>
            </p>

            <div className="document__qr">
              <NavLink
                className="user__dealer__profile__document__qr__link"
                exact
                to=""
              >
                <DescriptionIcon />
                Documents
              </NavLink>
              <NavLink
                className="user__dealer__profile__document__qr__link"
                to="/dealer/profile/qr"
              >
                <CropFreeIcon />
                QR Code
              </NavLink>
            </div>
          </div>
        </div>
      ) : null}

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default DealerProfile;
