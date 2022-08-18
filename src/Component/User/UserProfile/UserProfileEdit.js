import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// component
import Navbar from "../../Navbar";
import UserProfileSearchbar from "../../UserProfileSearchbar";
import UserProfileNavbar from "../UserProfileNavbar";
import MainFooter from "../../Footer/MainFooter";
import TermFooter from "../../Footer/TermFooter";

// css
import "../../../Css/UserDealerProfileEdit.css";
import "../../../App.css";

// api url
import { apiUrl } from "../../../Private";

const UserProfileEdit = () => {
  const [userData, setUserData] = useState();

  const apiKey = JSON.parse(localStorage.getItem("KTMauth"));

  const history = useHistory();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get user data
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
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get input value
  const getInputValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // update user data
  const updateUserProfile = (e) => {
    e.preventDefault();

    if (userData !== undefined) {
      axios
        .get(`https://api.postalpincode.in/pincode/${userData.area_pin}`)
        .then((res) => {
          if (res.data[0].Status === "Success") {
            try {
              const updateUrl = `${apiUrl}/users/edit-profile/`;

              const data = new FormData();
              data.append("name", userData.name);
              data.append("mobile", userData.mobile);
              data.append("area_pin", userData.area_pin);
              data.append("state", userData.state);
              data.append("address", userData.address);
              data.append("city", userData.city);

              fetch(updateUrl, {
                method: "POST",
                body: data,
                "Content-type": "multipart/form-data",
                headers: {
                  Authorization: `Token ${apiKey["key"]}`,
                },
              });

              history.push("/sell/user/profile");
            } catch (err) {
              console.log(err);
            }
          } else {
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

  return (
    <>
      <Navbar />

      <UserProfileSearchbar />

      <UserProfileNavbar />

      {userData !== undefined ? (
        <div className="user__dealer__profile__edit similar__section">
          <h1 className="similar__section__heading">Edit your profile</h1>
          <form onSubmit={updateUserProfile}>
            <input
              type="text"
              placeholder="Name"
              value={userData.name}
              name="name"
              onChange={getInputValue}
            />
            <input
              type="email"
              placeholder="Email ID"
              disabled
              value={userData.email}
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={userData.mobile}
              name="mobile"
              onChange={getInputValue}
            />
            <input
              type="text"
              placeholder="Pincode"
              value={userData.area_pin}
              name="area_pin"
              onChange={getInputValue}
            />
            <input
              type="text"
              placeholder="State"
              value={userData.state}
              name="state"
              onChange={getInputValue}
            />
            <input
              type="text"
              placeholder="City"
              value={userData.city}
              name="city"
              onChange={getInputValue}
            />
            <input
              type="text"
              placeholder="Address"
              value={userData.address}
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

export default UserProfileEdit;
