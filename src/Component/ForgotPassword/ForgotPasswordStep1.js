import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// material ui component
import TextField from "@material-ui/core/TextField";

// css
import "../../Css/Auth.css";

// redux
import { useDispatch } from "react-redux";
import { stepReducerActions } from "../../Redux/stepReducer";

// api url
import { apiUrl } from "../../Private";

const ForgotPasswordStep1 = () => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    email: "",
  });

  // get input value
  const getInputValue = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  // next forgot
  const nextForgot = async (e) => {
    e.preventDefault();

    try {
      const forgotUrl = `${apiUrl}/forget_password`;

      let data = new FormData();
      data.append("email", inputValue.email);

      
      // let data = {"email": inputValue.email};
      // data = JSON.stringify(data);

      // console.log(data);
      await axios.post(forgotUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // const data = {"email": inputValue.email};

      // let result = await fetch(`https://ktweb04ar.herokuapp.com/forget_password`,
      // {
      //   method:'GET',
      //   headers: {
      //     "Content-Type":"application/json",
      //   },
      //   body: JSON.stringify(data)
      // });

      // result = await result.json();
      // console.log(result);

      setInputValue({
        email: "",
      });
      dispatch(stepReducerActions.forward("forgotPasswordStep"));
    } catch (err) {
      console.log(err);
    }

    // Swal.fire({
    //   title: "Forget Password feature will be live soon.",
    //   confirmButtonColor: "#56b124",
    // });
  };

  return (
    <div className="section">
      <h1>Password Reset</h1>

      <form className="form" onSubmit={nextForgot}>
        <p className="form__top__text">
          Type your address below and we will send you an OTP on your email with
          instruction on how to reset your password.
        </p>
        <TextField
          className="input"
          type="email"
          label="Email"
          variant="outlined"
          name="email"
          required
          onChange={getInputValue}
          value={inputValue.email}
        />
        <button className="form__button" type="submit">
          Next
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordStep1;
