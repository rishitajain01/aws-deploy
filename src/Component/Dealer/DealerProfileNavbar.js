import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

// css
import "../../Css/ProfileNavbar.css";

// material icon
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const DealerProfileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  // log out
  const logOut = () => {
    localStorage.removeItem("KTMauth");
    history.push("/signin");
  };

  return (
    <>
      <div
        className="menubar"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
      <ul
        className={
          isOpen ? "profile__navbar profile__navbar__active" : "profile__navbar"
        }
      >
        <li>
          <NavLink
            to="/dealer/home"
            className="profile__link"
            activeClassName="active__profile__link"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <HomeIcon /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dealer/profile"
            className="profile__link"
            activeClassName="active__profile__link"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <AccountCircleIcon /> Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dealer/pickup"
            className="profile__link"
            activeClassName="active__profile__link"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <TransferWithinAStationIcon /> Pickup
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dealer/wallet"
            className="profile__link"
            activeClassName="active__profile__link"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <AccountBalanceWalletIcon /> Wallet
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dealer/settings"
            className="profile__link"
            activeClassName="active__profile__link"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <SettingsIcon /> Settings
          </NavLink>
        </li>
        <li>
          <button
            className="profile__link"
            activeClassName="active__profile__link"
            onClick={logOut}
          >
            <ExitToAppIcon /> Logout
          </button>
        </li>
      </ul>
    </>
  );
};

export default DealerProfileNavbar;
