import React, { useState, useEffect } from "react";
import axios from "axios";

// component
import Navbar from "../../Navbar";
import UserProfileSearchbar from "../../UserProfileSearchbar";
import UserProfileNavbar from "../UserProfileNavbar";
import UserDealerPickupCard from "../../UserDealerSimilarComponent/UserDealerPickupCard";
import MainFooter from "../../Footer/MainFooter";
import TermFooter from "../../Footer/TermFooter";

// css
import "../../../Css/UserDealerPickup.css";
import "../../../App.css";

// api url
import { apiUrl } from "../../../Private";

const UserPickup = () => {
  const [pickupData, setPickupData] = useState([]);

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const apiKey = JSON.parse(localStorage.getItem("KTMauth"));

  // get pickup data
  useEffect(() => {
    const pickupUrl = `${apiUrl}/store/get-pickups/`;
    const config = {
      headers: {
        Authorization: `Token ${apiKey["key"]}`,
      },
    };

    axios
      .get(pickupUrl, config)
      .then((res) => {
        setPickupData(res.data);
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

      <div className="user__dealer__pickup__section similar__section">
        <h1 className="similar__section__heading">Your Pickup</h1>

        <div className="user__dealer__pickup">
          {pickupData.length !== 0 ? (
            pickupData.map((eachData) => {
              return (
                <UserDealerPickupCard
                  key={eachData.id}
                  uniqueId={eachData.id}
                  date={eachData.date_of_pickup}
                  time={eachData.time_of_pickup}
                  status={eachData.status}
                />
              );
            })
          ) : (
            <p>No pickup data available here</p>
          )}
        </div>
      </div>

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default UserPickup;
