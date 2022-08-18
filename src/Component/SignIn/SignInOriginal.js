import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import GoogleLogin from "react-google-login";

// material ui component
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// component
import Navbar from "../Navbar";
import LeftBanner from "../AuthPageBanner/LeftBanner";
import TermFooter from "../Footer/TermFooter";

// css
import "../../Css/Auth.css";

// api url
import { apiUrl } from "../../Private";

// redux
import { useDispatch } from "react-redux";
import { stepReducerActions } from "../../Redux/stepReducer";

const SignIn = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // remove google token from localstorage
  useEffect(() => {
    localStorage.removeItem("KTMgauth");
  }, []);

  // show hide password
  const showHidePassword = () => {
    setShowPassword(!showPassword);
  };

  // get input value
  const getInputValue = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  // sign in
  const signIn = async (e) => {
    e.preventDefault();

    try {
      const loginUrl = `${apiUrl}/rest-auth/login/`;

      const data = new FormData();
      data.append("email", inputValue.email);
      data.append("password", inputValue.password);

      const headers = {
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(loginUrl, data, headers);

      localStorage.setItem("KTMauth", JSON.stringify(response.data));
      setInputValue({
        email: "",
        password: "",
      });

      dispatch(stepReducerActions.reset("customerSignUpPersonalStep"));
      dispatch(stepReducerActions.reset("customerSignUpOrganizationStep"));
      dispatch(stepReducerActions.reset("dealerSignUpStep"));
      dispatch(stepReducerActions.reset("forgotPasswordStep"));

      if (response.data["user"] === "is_customer") {
        localStorage.removeItem("KTMsellItemName");
        history.push("/sell");
      } else if (response.data["user"] === "is_dealer") {
        history.push("/dealer/home");
      }
    } catch (err) {
      Swal.fire({
        title: "Please enter correct email and password to SignIn",
        confirmButtonColor: "#56b124",
      });
    }
  };

  // google login
  const googleLogin = async (email) => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(
        `${apiUrl}/users/google-login/`,
        {
          email: email,
        },
        headers
      );
      localStorage.setItem("KTMgauth", JSON.stringify(response.data));
      history.push("/sell");
    } catch (error) {
      console.error(error);
    }
  };

  const responseGoogle = (response) => {
    if (response && !response.error) {
      const email = response.profileObj.email;
      googleLogin(email);
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth__section">
        <LeftBanner />

        <div className="section">
          <h1>Sign In</h1>

          <form className="form" onSubmit={signIn}>
            <TextField
              className="input"
              type="email"
              label="Email ID"
              variant="outlined"
              onChange={getInputValue}
              name="email"
              value={inputValue.email}
              required
            />
            <FormControl variant="outlined" className="form__control">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                required
                label="Password"
                className="input"
                type={showPassword ? "text" : "password"}
                value={inputValue.password}
                name="password"
                onChange={getInputValue}
                endAdornment={
                  <InputAdornment>
                    <IconButton onClick={showHidePassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <NavLink
              className="forgot__password__link"
              to="/signin/forgotpassword"
            >
              Forgot Password?
            </NavLink>
            <button className="form__button" type="submit">
              Sign In
            </button>
          </form>
          {/* <p>Or connect with</p>

          <div className="auth">
            <GoogleLogin
              clientId="839555905156-qpenbug205f1mu5sftdu8skmhmh5pgn9.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  className="auth__button"
                  onClick={() => {
                    renderProps.onClick();
                  }}
                  disabled={renderProps.disabled}
                >
                  <img
                    src="https://image.flaticon.com/icons/png/128/281/281764.png"
                    alt="google-icon"
                  />
                </button>
              )}
              buttonText="Login"
              onSuccess={(response) => responseGoogle(response)}
              onFailure={(response) => responseGoogle(response)}
              cookiePolicy={"single_host_origin"}
            />
          </div> */}
        </div>
      </div>

      <TermFooter />
    </>
  );
};

export default SignIn;
