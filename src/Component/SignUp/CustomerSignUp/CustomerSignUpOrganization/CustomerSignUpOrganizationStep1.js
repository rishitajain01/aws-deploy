import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

// material ui component
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// css
import "../../../../Css/Auth.css";

// redux
import { useDispatch } from "react-redux";
import { stepReducerActions } from "../../../../Redux/stepReducer";

const CustomerSignUpOrganizationStep1 = () => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password1: false,
    password2: false,
  });

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get input value
  const getInputValue = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  // next step
  const nextStep = (e) => {
    e.preventDefault();
    if (
      typeof inputValue.fullName === "string" &&
      !isNaN(inputValue.mobileNumber) &&
      inputValue.mobileNumber.length === 10
    ) {
      if (
        inputValue.password.length >= 8 &&
        inputValue.password === inputValue.confirmPassword
      ) {
        const infos = JSON.parse(localStorage.getItem("KTMinfo"));
        infos["name"] = inputValue.fullName;
        infos["email"] = inputValue.email;
        infos["phone"] = inputValue.mobileNumber;
        infos["password1"] = inputValue.password;
        infos["password2"] = inputValue.confirmPassword;
        localStorage.setItem("KTMinfo", JSON.stringify(infos));
        setInputValue({
          fullName: "",
          email: "",
          mobileNumber: "",
          password: "",
          confirmPassword: "",
        });
        dispatch(stepReducerActions.forward("customerSignUpOrganizationStep"));
      } else {
        Swal.fire({
          title: "passwords must be same and more than 8 characters",
          confirmButtonColor: "#56b124",
        });
      }
    } else {
      Swal.fire({
        title: "Please fill the form properly",
        confirmButtonColor: "#56b124",
      });
    }
  };

  return (
    <div className="section">
      <h1>Sign Up</h1>

      <form className="form" onSubmit={nextStep}>
        <TextField
          className="input"
          type="text"
          label="Your Organization Name"
          variant="outlined"
          name="fullName"
          value={inputValue.fullName}
          onChange={getInputValue}
          required
        />
        <TextField
          className="input"
          type="email"
          label="Your Organization Email"
          variant="outlined"
          name="email"
          value={inputValue.email}
          onChange={getInputValue}
          required
        />
        <TextField
          className="input"
          type="text"
          label="Your Mobile Number"
          variant="outlined"
          name="mobileNumber"
          value={inputValue.mobileNumber}
          onChange={getInputValue}
          required
        />
        <FormControl variant="outlined" className="form__control">
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            required
            label="Password"
            className="input"
            type={showPassword.password1 ? "text" : "password"}
            value={inputValue.password}
            name="password"
            onChange={getInputValue}
            endAdornment={
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPassword({
                      ...showPassword,
                      password1: !showPassword.password1,
                    });
                  }}
                  edge="end"
                >
                  {showPassword.password1 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="outlined" className="form__control">
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            required
            label="Confirm Password"
            className="input"
            type={showPassword.password2 ? "text" : "password"}
            value={inputValue.confirmPassword}
            name="confirmPassword"
            onChange={getInputValue}
            endAdornment={
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPassword({
                      ...showPassword,
                      password2: !showPassword.password2,
                    });
                  }}
                  edge="end"
                >
                  {showPassword.password2 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <p className="signup__agreement">
          <input type="checkbox" required /> I have read and agree to the{" "}
          <NavLink
            exact
            to="/privacypolicy"
            className="signup__agreement__link"
          >
            Privacy Policy
          </NavLink>{" "}
          and{" "}
          <NavLink
            exact
            to="/termsconditions"
            className="signup__agreement__link"
          >
            Terms & Conditions
          </NavLink>
        </p>
        <button className="form__button" type="submit">
          Next
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <NavLink className="signin__link" to="/signin">
          Sign In
        </NavLink>
      </p>
    </div>
  );
};

export default CustomerSignUpOrganizationStep1;
