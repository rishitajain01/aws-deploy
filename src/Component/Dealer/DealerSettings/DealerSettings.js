import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

// css
import "../../../Css/DealerSettings.css";
import "../../../App.css";

// component
import DealerProfileSearchbar from "../DealerProfileSearchbar";
import DealerProfileNavbar from "../DealerProfileNavbar";
import MainFooter from "../../Footer/MainFooter";
import TermFooter from "../../Footer/TermFooter";

// material icon
import DescriptionIcon from "@material-ui/icons/Description";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";

const DealerSettings = () => {
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DealerProfileSearchbar />

      <DealerProfileNavbar />

      <div className="dealer__settings__section similar__section">
        <h1 className="similar__section__heading">Complete Your Profile</h1>
        <div className="settings__section">
          <NavLink
            className="settings__link"
            to="/dealer/settings/documentupload"
          >
            <span>
              <DescriptionIcon />
              <p>Documents Upload</p>
            </span>
            {/* <h1>Status</h1> */}
          </NavLink>
          <NavLink className="settings__link" to="/dealer/settings/addarea">
            <span>
              <AddLocationIcon />
              <p>Add Area Pincode</p>
            </span>
            {/* <h1>Status</h1> */}
          </NavLink>
          <NavLink className="settings__link" to="/dealer/settings/setprice">
            <span>
              <CreditCardIcon />
              <p>Add Your Price</p>
            </span>
            {/* <h1>Status</h1> */}
          </NavLink>
          <NavLink
            className="settings__link"
            to="/dealer/settings/requestcategory"
          >
            <span>
              <AddToPhotosIcon />
              <p>
                Request to
                <br />
                Add Category
              </p>
            </span>
            {/* <h1>Status</h1> */}
          </NavLink>
        </div>
      </div>

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default DealerSettings;
