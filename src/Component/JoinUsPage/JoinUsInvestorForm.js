import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

// css
import "../../Css/JoinUsForm.css";

// material ui component
import TextField from "@material-ui/core/TextField";

// api url
import { apiUrl } from "../../Private";

const JoinUsMentorForm = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
  });

  // get input value
  const getInputValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  // join us
  const joinUs = async (e) => {
    e.preventDefault();
    if (
      inputValue.name !== "" &&
      inputValue.email !== "" &&
      inputValue.phone !== "" &&
      inputValue.linkedin !== ""
    ) {
      const linkedIn =
        /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/gm;
      if (
        typeof inputValue.name === "string" &&
        !isNaN(inputValue.phone) &&
        inputValue.phone.length === 10 &&
        inputValue.linkedin.match(linkedIn)
      ) {
        try {
          const postUrl = `${apiUrl}/extras/investor-form/`;

          const data = new FormData();
          data.append("name", inputValue.name);
          data.append("email", inputValue.email);
          data.append("phone", inputValue.phone);
          data.append("linkedin_id", inputValue.linkedin);

          const headers = {
            "Content-Type": "multipart/form-data",
          };

          await axios.post(postUrl, data, headers);

          Swal.fire({
            title: "Uploaded",
            confirmButtonColor: "#56b124",
          });
          setInputValue({
            name: "",
            email: "",
            phone: "",
            linkedin: "",
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        Swal.fire({
          title: "Please fill the form properly",
          confirmButtonColor: "#56b124",
        });
      }
    }
  };

  return (
    <form className="join__us__form" onSubmit={joinUs}>
      <div className="sub__section">
        <TextField
          className="input"
          type="text"
          label="Name"
          variant="outlined"
          name="name"
          required
          onChange={getInputValue}
          value={inputValue.name}
        />
        <TextField
          className="input"
          type="email"
          label="Email ID"
          variant="outlined"
          name="email"
          required
          onChange={getInputValue}
          value={inputValue.email}
        />
      </div>
      <div className="sub__section">
        <TextField
          className="input"
          type="tel"
          label="Phone Number"
          variant="outlined"
          name="phone"
          required
          onChange={getInputValue}
          value={inputValue.phone}
        />
        <TextField
          className="input"
          type="url"
          label="LinkedIn ID"
          variant="outlined"
          name="linkedin"
          required
          onChange={getInputValue}
          value={inputValue.linkedin}
        />
      </div>
      <button type="submit">Join Us</button>
    </form>
  );
};

export default JoinUsMentorForm;
