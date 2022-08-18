import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";

// css
import "../Css/Navbar.css";

// material icon
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

// logo
import kabadi__techno__logo from "../Image/kabadi__techno__logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const apiKey = localStorage.getItem("KTMauth");

  return (
    <div className="navbar">
      <div>
        <NavLink exact to="/" className="logo">
          <img src={kabadi__techno__logo} alt="" />
        </NavLink>

        <ul className={isOpen ? "navlist navlist__active" : "navlist"}>
          <li>
            <NavLink
              exact
              to="/"
              className="navlink"
              activeClassName="active__navlink"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/joinus"
              className="navlink"
              activeClassName="active__navlink"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              JOIN US
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sell"
              className="navlink"
              activeClassName="active__navlink"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              SELL
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faq"
              className="navlink"
              activeClassName="active__navlink"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              FAQ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navlink"
              activeClassName="active__navlink"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              CONTACT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signin"
              className="navlink"
              activeClassName="active__navlink"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              data-effect={apiKey !== null ? "solid" : null}
              data-tip={apiKey !== null ? "You are Signed In" : null}
              data-background-color={apiKey !== null ? "#44aa0e" : null}
              data-place={apiKey !== null ? "bottom" : null}
              data-text-color={apiKey !== null ? "#fff" : null}
            >
              SIGN IN
            </NavLink>
          </li>
          <ReactTooltip />
        </ul>

        <div
          className="menu"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
