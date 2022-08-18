import React, { useState, useEffect } from "react";
import axios from "axios";

// css
import "../../../Css/DealerHome.css";
import "../../../App.css";

// component
import DealerProfileSearchbar from "../DealerProfileSearchbar";
import DealerProfileNavbar from "../DealerProfileNavbar";
import DealerHomeCard from "./DealerHomeCard";
import MainFooter from "../../Footer/MainFooter";
import TermFooter from "../../Footer/TermFooter";

// api url
import { apiUrl } from "../../../Private";

const DealerHome = () => {
  const [homeData, setHomeData] = useState([
    { title: "Total Pickup", number: "0" },
    { title: "Total Category", number: "0" },
    { title: "Total Successful", number: "0" },
    { title: "Total Cancel", number: "0" },
    { title: "Total Today Pickup", number: "0" },
  ]);

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const apiKey = JSON.parse(localStorage.getItem("KTMauth"));

  // get home data
  useEffect(() => {
    const homeDataUrl = `${apiUrl}/store/home-page/`;
    const config = {
      headers: {
        Authorization: `Token ${apiKey["key"]}`,
      },
    };

    axios
      .get(homeDataUrl, config)
      .then((res) => {
        setHomeData([
          { title: "Total Pickup", number: res.data.total_pickups },
          { title: "Total Category", number: res.data.categories },
          { title: "Total Successful", number: res.data.successful },
          { title: "Total Cancel", number: res.data.cancelled },
          { title: "Total Today Pickup", number: res.data.todays_pickups },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <DealerProfileSearchbar />

      <DealerProfileNavbar />

      <div className="dealer__home similar__section">
        <h1 className="similar__section__heading">Dashboard</h1>

        <div className="dashboard">
          {homeData.map((eachData, eachDataIndex) => {
            return (
              <DealerHomeCard
                key={eachDataIndex}
                title={eachData.title}
                number={eachData.number}
              />
            );
          })}
        </div>
      </div>

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default DealerHome;
