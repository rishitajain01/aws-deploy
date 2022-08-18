import React, { useEffect, useState } from "react";
import axios from "axios";

// css
import "../../Css/DealerProfileSearchbar.css";

// material icon
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

// logo
import kabadi__techno__logo from "../../Image/kabadi__techno__logo.png";

// api url
import { apiUrl } from "../../Private";

const DealerProfileSearchbar = () => {
  const [dealerName, setDealerName] = useState();

  // get dealer name
  useEffect(() => {
    const apiKey = JSON.parse(localStorage.getItem("KTMauth"));
    const profileUrl = `${apiUrl}/users/profile/`;
    const config = {
      headers: {
        Authorization: `Token ${apiKey["key"]}`,
      },
    };

    axios
      .get(profileUrl, config)
      .then((response) => {
        setDealerName(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="dealer__profile__searchbar">
      <span className="logo">
        <img src={kabadi__techno__logo} alt="" />
      </span>
      {/* <div className="searchbar">
        <input type="text" />
        <SearchIcon />
      </div> */}
      <p>
        Welcome {dealerName !== undefined ? dealerName.name : null}
        <AccountCircleIcon />
      </p>
    </div>
  );
};

export default DealerProfileSearchbar;
