import React from "react";
import { NavLink } from "react-router-dom";

// css
import "../../Css/Footer.css";

// material icon
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const MainFooter = () => {
  return (
    //   main footer
    <div className="main__footer">
      {/* link section */}
      <div className="link__section">
        {/* about us links */}
        <ul>
          <h1 className="footer__header">ABOUT US</h1>
          <li>
            <a className="footer__link" href="/#ourvision">
              Our Vision
            </a>
          </li>
          <li>
            <a className="footer__link" href="/#ourmission">
              Our Mission
            </a>
          </li>
          <li>
            <a className="footer__link" href="/#ourteam">
              Our Team
            </a>
          </li>
          <li>
            <a className="footer__link" href="/#whatwedo">
              What We Do?
            </a>
          </li>
        </ul>

        {/* important links */}
        <ul>
          <h1 className="footer__header">IMPROTANT LINKS</h1>
          <li>
            <a className="footer__link" href="/sell/#sellyourscrap">
              Sell Your Scarp
            </a>
          </li>
          <li>
            <a className="footer__link" href="/joinus/#joinourteam">
              Join Our Team
            </a>
          </li>
          <li>
            <NavLink exact to="/termsconditions" className="footer__link">
              Teams & Conditions
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/privacypolicy" className="footer__link">
              Privacy Policy
            </NavLink>
          </li>
        </ul>

        {/* contact us links */}
        <ul>
          <h1 className="footer__header">CONTACT US</h1>
          <li>
            <p className="footer__link">
              <LocationOnIcon className="footer__link__icon" /> 16, South Arjun
              Nagar Agra
            </p>
          </li>
          <li>
            <p className="footer__link">
              <EmailIcon className="footer__link__icon" /> Info@kabaditechno.com
            </p>
          </li>
          <li>
            <p className="footer__link">
              <PhoneIcon className="footer__link__icon" /> +91 7503386621
              <br />
              +91 9773857717
            </p>
          </li>
        </ul>
      </div>

      {/* social section */}
      <div className="social__section">
        <h1 className="footer__header">CONNECT WITH US</h1>
        <div className="social__link">
          <a href="https://www.facebook.com/kabaditechno/?modal=admin_todo_tour">
            <FacebookIcon className="social__link__icon" />
          </a>
          <a href="https://www.instagram.com/kabaditechno/">
            <InstagramIcon className="social__link__icon" />
          </a>
          <a href="https://www.linkedin.com/company/kabadi-techno">
            <LinkedInIcon className="social__link__icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
