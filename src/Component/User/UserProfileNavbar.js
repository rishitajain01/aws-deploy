import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

// css
import "../../Css/ProfileNavbar.css";

// material icon
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import CropFreeIcon from "@material-ui/icons/CropFree";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// redux
import { useDispatch } from "react-redux";
import { cartReducerActions } from "../../Redux/cartReducer";
import { stepReducerActions } from "../../Redux/stepReducer";

const UserProfileNavbar = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  // log out
  const logOut = () => {
    dispatch(cartReducerActions.reset());
    dispatch(stepReducerActions.reset("cartStep"));
    localStorage.removeItem("KTMauth");
    localStorage.removeItem("KTMpincode");
    localStorage.removeItem("KTMsellItemName");
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
            to="/sell/user/profile"
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
            to="/sell/user/pickup"
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
            to="/sell/user/wallet"
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
            to="/sell/user/qr"
            className="profile__link"
            activeClassName="active__profile__link"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <CropFreeIcon /> QR Code
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sell/user/autoscrap"
            className="profile__link"
            activeClassName="active__profile__link"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <AutorenewIcon /> Auto Scrap
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

export default UserProfileNavbar;
