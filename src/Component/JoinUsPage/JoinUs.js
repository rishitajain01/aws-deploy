import React, { useEffect, useState } from "react";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

// css
import "../../Css/JoinUs.css";
import "../../App.css";

// component
import Navbar from "../Navbar";
import JoinUsComponent from "./JoinUsComponent";
import MainFooter from "../../Component/Footer/MainFooter";
import TermFooter from "../../Component/Footer/TermFooter";

// join us details
import { JoinUsDetails } from "./JoinUsDetails";

// api url
import { apiUrl } from "../../Private";

const JoinUs = () => {
  const [joinUsDetails, setJoinUsDetails] = useState(JoinUsDetails);
  const [happyTeamMember, setHappyTeamMember] = useState([]);

  // get happy team member data
  useEffect(() => {
    axios
      .get(`${apiUrl}/extras/working-team-members/`)
      .then((response) => {
        setHappyTeamMember(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // join us component open close
  const openClose = (index) => {
    const newJoinUsDetails = joinUsDetails.map(
      (eachDetail, eachDetailIndex) => {
        if (eachDetailIndex === index) {
          eachDetail.isOpen = !eachDetail.isOpen;
        } else {
          eachDetail.isOpen = false;
        }
        return eachDetail;
      }
    );
    setJoinUsDetails(newJoinUsDetails);
  };

  return (
    <>
      <Navbar />

      <div className="main__section">
        <div className="join__us__top__banner">
          <h1>JOIN OUR TEAM</h1>
          <p>
            "Alone, we can do so little...
            <br />
            Together, we can do so much"
          </p>
          <span>~ Helen Keller</span>
        </div>

        <div className="join__us__section" id="joinourteam">
          {joinUsDetails.map((eachDetail, eachDetailIndex) => {
            return (
              <JoinUsComponent
                key={eachDetailIndex}
                title={eachDetail.title}
                headline={eachDetail.headline}
                description={eachDetail.description}
                disclaimer={eachDetail.disclaimer}
                component={eachDetail.component}
                isOpen={eachDetail.isOpen}
                openClose={openClose.bind(this, eachDetailIndex)}
              />
            );
          })}
        </div>

        <div className="main__section__carousel">
          <h1>Our Happy Members</h1>
          {happyTeamMember.length !== 0 ? (
            <div className="carousel__section">
              <Splide
                className="main__carousel"
                options={{
                  type: "loop",
                  gap: "1rem",
                  autoplay: true,
                  pauseOnHover: false,
                  resetProgress: false,
                  pagination: false,
                  arrows: false,
                }}
              >
                {happyTeamMember.map((eachDetails, eachDetailsIndex) => {
                  return (
                    <SplideSlide key={eachDetailsIndex} className="carousel">
                      <img src={eachDetails.dp} alt="" />
                      <div>
                        <h1>{eachDetails.feedback}</h1>
                        <p>{eachDetails.name}</p>
                      </div>
                    </SplideSlide>
                  );
                })}
              </Splide>
            </div>
          ) : null}
        </div>
      </div>

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default JoinUs;
