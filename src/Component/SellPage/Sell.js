import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Swal from "sweetalert2";

// component
import Navbar from "../Navbar";
import SellFaqTopBanner from "../SellFaqTopBanner";
import UserProfileSearchbar from "../UserProfileSearchbar";
import ChangePincode from "../ChangePincode";
import SellCard from "./SellCard";
import MainFooter from "../../Component/Footer/MainFooter";
import TermFooter from "../../Component/Footer/TermFooter";

// css
import "../../Css/Sell.css";
import "../../App.css";

// api url
import { apiUrl } from "../../Private";

const Sell = () => {
  const [scrapCategoryData, setScrapCategoryData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [happyCustomer, setHappyCustomer] = useState([]);

  const [userData, setUserData] = useState({ area_pin: "", type: "" });
  const [modalPincode, setModalPincode] = useState("");

  const apiKey = JSON.parse(localStorage.getItem("KTMauth"));
  const gAuth = localStorage.getItem("KTMgauth");
  const pincode = localStorage.getItem("KTMpincode");

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // open modal
  const openModal = () => {
    setIsOpen(!isOpen);
  };

  // get user data
  useEffect(() => {
    if (apiKey !== null) {
      if (apiKey["user"] === "is_customer") {
        const profileUrl = `${apiUrl}/users/profile/`;
        const config = {
          headers: {
            Authorization: `Token ${apiKey["key"]}`,
          },
        };
        axios
          .get(profileUrl, config)
          .then((response) => {
            setUserData({
              area_pin: response.data.area_pin,
              type:
                response.data.personal_account === true
                  ? "Personal Account"
                  : "Organization Account",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  // save pincode to local storage
  useEffect(() => {
    if (userData.area_pin !== "") {
      localStorage.setItem("KTMpincode", userData.area_pin);
    }
  }, [userData.area_pin]);

  // change pincode
  const changePincode = () => {
    if (modalPincode !== "") {
      axios
        .get(`https://api.postalpincode.in/pincode/${modalPincode}`)
        .then((res) => {
          if (res.data[0].Status === "Success") {
            setUserData({ ...userData, area_pin: modalPincode });
            setModalPincode("");
            setIsOpen(!isOpen);
          } else {
            setModalPincode("");
            setIsOpen(!isOpen);
            Swal.fire({
              title: "Invalid pincode",
              confirmButtonColor: "#56b124",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // get sell category data
  useEffect(() => {
    axios
      .get(`${apiUrl}/store/get-categories/`)
      .then((res) => {
        setScrapCategoryData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get happy customer data
  useEffect(() => {
    axios
      .get(`${apiUrl}/extras/happy-customers/`)
      .then((response) => {
        setHappyCustomer(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="main__section">
        {apiKey === null && gAuth === null ? (
          <SellFaqTopBanner title="Kabadi Techno Rates of Scrap" />
        ) : null}

        {apiKey !== null ? (
          apiKey["user"] === "is_customer" ? (
            <>
              <UserProfileSearchbar />

              <h1>Kabadi Techno Rates of Scrap</h1>

              <ChangePincode
                openModal={openModal}
                pincode={userData.area_pin}
              />
            </>
          ) : null
        ) : gAuth !== null ? (
          <>
            <UserProfileSearchbar />

            <h1>Kabadi Techno Rates of Scrap</h1>

            <ChangePincode
              pincode={
                userData.area_pin !== ""
                  ? userData.area_pin
                  : pincode
                  ? pincode
                  : "Select"
              }
              openModal={openModal}
            />
          </>
        ) : (
          <ChangePincode
            pincode={
              userData.area_pin !== ""
                ? userData.area_pin
                : pincode
                ? pincode
                : "Select"
            }
            openModal={openModal}
          />
        )}

        <div className="scrap__section" id="sellyourscrap">
          {scrapCategoryData.map((eachData) => {
            return (
              <SellCard
                key={eachData.id}
                pic={eachData.pic}
                title={eachData.title}
              />
            );
          })}
        </div>

        <div className="main__section__carousel">
          <h1>Our Happy Customers</h1>
          {happyCustomer.length !== 0 ? (
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
                {happyCustomer.map((eachDetails, eachDetailsIndex) => {
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

        <Modal
          className="modal__content"
          overlayClassName="modal__overlay"
          isOpen={isOpen}
          ariaHideApp={false}
        >
          <h1>Change area pincode</h1>
          <input
            type="text"
            placeholder="Pincode"
            value={modalPincode}
            onChange={(e) => {
              setModalPincode(e.target.value);
            }}
          />
          {apiKey !== null || gAuth !== null ? (
            <input
              type="text"
              placeholder="customer type"
              disabled
              value={userData.type !== "" ? userData.type : "Guest"}
            />
          ) : null}
          <div>
            <button onClick={changePincode}>Done</button>
          </div>
        </Modal>
      </div>

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default Sell;
