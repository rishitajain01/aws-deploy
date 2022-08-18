import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// css
import "../../../Css/UserDealerProfileEdit.css";
import "../../../App.css";

// component
import DealerProfileSearchbar from "../DealerProfileSearchbar";
import DealerProfileNavbar from "../DealerProfileNavbar";
import MainFooter from "../../Footer/MainFooter";
import TermFooter from "../../Footer/TermFooter";

// api url
import { apiUrl } from "../../../Private";

const DealerProfileEdit = () => {
  const [dealerData, setDealerData] = useState();

  const apiKey = JSON.parse(localStorage.getItem("KTMauth"));

  const history = useHistory();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get dealer data
  useEffect(() => {
    const profileUrl = `${apiUrl}/users/profile/`;
    const config = {
      headers: {
        Authorization: `Token ${apiKey["key"]}`,
      },
    };

    axios
      .get(profileUrl, config)
      .then((response) => {
        setDealerData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get input value
  const getInputValue = (e) => {
    setDealerData({ ...dealerData, [e.target.name]: e.target.value });
  };

  // update dealer data
  const updateDealerProfile = async (e) => {
    e.preventDefault();

    if (dealerData !== undefined) {
      try {
        const updateUrl = `${apiUrl}/users/edit-profile/`;

        const data = new FormData();
        data.append("name", dealerData.name);
        data.append("mobile", dealerData.mobile);
        data.append("area_pin", dealerData.area_pin);
        data.append("state", dealerData.state);
        data.append("address", dealerData.address);
        data.append("city", dealerData.city);

        await fetch(updateUrl, {
          method: "POST",
          body: data,
          "Content-type": "multipart/form-data",
          headers: {
            Authorization: `Token ${apiKey["key"]}`,
          },
        });

        history.push("/dealer/profile");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <DealerProfileSearchbar />

      <DealerProfileNavbar />

      {dealerData !== undefined ? (
        <div className="user__dealer__profile__edit similar__section">
          <h1 className="similar__section__heading">Edit your profile</h1>
          <form onSubmit={updateDealerProfile}>
            <input
              type="text"
              placeholder="Name"
              value={dealerData.name}
              name="name"
              onChange={getInputValue}
            />
            <input
              type="email"
              placeholder="Email ID"
              disabled
              value={dealerData.email}
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={dealerData.mobile}
              name="mobile"
              onChange={getInputValue}
            />
            <input
              type="text"
              placeholder="Pincode"
              value={dealerData.area_pin}
              name="area_pin"
              onChange={getInputValue}
            />
            <input
              type="text"
              placeholder="State"
              value={dealerData.state}
              name="state"
              onChange={getInputValue}
            />
            <input
              type="text"
              placeholder="City"
              value={dealerData.city}
              name="city"
              onChange={getInputValue}
            />
            <input
              type="text"
              placeholder="Address"
              value={dealerData.address}
              name="address"
              onChange={getInputValue}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : null}

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default DealerProfileEdit;
