import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

// css
import "../Css/UserProfileSearchbar.css";

// material icon
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// api url
import { apiUrl } from "../Private";

const UserProfileSearchbar = () => {
  const [userName, setUserName] = useState();

  const apiKey = JSON.parse(localStorage.getItem("KTMauth"));
  const gAuth = JSON.parse(localStorage.getItem("KTMgauth"));

  // get user name
  useEffect(() => {
    if (apiKey !== null) {
      const profileUrl = `${apiUrl}/users/profile/`;
      const config = {
        headers: {
          Authorization: `Token ${apiKey["key"]}`,
        },
      };

      axios
        .get(profileUrl, config)
        .then((response) => {
          setUserName(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="user__profile__searchbar">
      {/* <div className="searchbar">
        <input type="text" />
        <SearchIcon />
      </div> */}
      <div className="profile">
        <p>
          {userName !== undefined
            ? `Welcome ${userName.name}`
            : gAuth !== null
            ? "Welcome As Guest"
            : "Loading..."}
        </p>
        <div>
          <NavLink to="/sell/user/profile" className="profile__icon">
            <AccountCircleIcon />
          </NavLink>
          <NavLink to="/sell/cart" className="cart__icon">
            <ShoppingCartIcon />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSearchbar;
