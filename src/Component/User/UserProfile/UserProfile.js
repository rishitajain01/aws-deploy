import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

// css
import "../../../Css/UserDealerProfile.css";

// component
import Navbar from "../../Navbar";
import UserProfileSearchbar from "../../UserProfileSearchbar";
import UserProfileNavbar from "../UserProfileNavbar";
import MainFooter from "../../Footer/MainFooter";
import TermFooter from "../../Footer/TermFooter";

// image
import customer__profile__img from "../../../Image/customer__profile__img.PNG";

// api url
import { apiUrl } from "../../../Private";

const UserProfile = () => {
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
        <div className="user__dealer__profile">
          <div className="left__side">
            <img src={customer__profile__img} alt="" />
            <NavLink
              className="user__dealer__profile__edit__link"
              to="/sell/user/profile/profileedit"
            >
              Edit
            </NavLink>
          </div>
          <div className="right__side">
            <p>
              Name : <span>{userData.name}</span>
            </p>
            <p>
              Email ID : <span>{userData.email}</span>
            </p>
            <p>
              Mobile Number : <span>{userData.mobile}</span>
            </p>
            <p>
              Pincode : <span>{userData.area_pin}</span>
            </p>
            <p>
              State : <span>{userData.state}</span>
            </p>
            <p>
              City : <span>{userData.city}</span>
            </p>
            <p>
              Address : <span>{userData.address}</span>
            </p>
          </div>
        </div>
      ) : null}

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default UserProfile;
