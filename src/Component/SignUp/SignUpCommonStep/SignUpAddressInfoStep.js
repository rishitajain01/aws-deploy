import React, { useState, useEffect } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// material ui component
import TextField from "@material-ui/core/TextField";

// css
import "../../../Css/Auth.css";

// redux
import { useDispatch } from "react-redux";
import { stepReducerActions } from "../../../Redux/stepReducer";

// api url
import { apiUrl } from "../../../Private";

const SignUpAddressInfoStep = () => {
  const [inputValue, setInputValue] = useState({
    areaPincode: "",
    state: "",
    city: "",
    address: "",
  });

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

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

  // get pincode detail
  const getPincodeDetail = async (e) => {
    if (inputValue.areaPincode !== "") {
      if (e.key === "Tab") {
        try {
          const response = await axios.get(
            `https://api.postalpincode.in/pincode/${inputValue.areaPincode}`
          );

          if (response.data[0].PostOffice !== null) {
            setInputValue({
              ...inputValue,
              state: response.data[0].PostOffice[0].State,
              city: response.data[0].PostOffice[0].District,
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  // sign up
  const signUp = async (e) => {
    e.preventDefault();

    // send response to backend
    try {
      const infos = JSON.parse(localStorage.getItem("KTMinfo"));

      const registrationUrl = `${apiUrl}/user_registration`;

      // https://github.com/avadev/AvaTax-REST-V2-JS-SDK/issues/41
      // https://youtu.be/9KaMsGSxGno?t=694

      const data = new FormData();
      data.append("name", infos["name"]);
      data.append("email", infos["email"]);
      data.append("password1", infos["password1"]);
      data.append("password2", infos["password2"]);
      data.append("is_dealer", infos["isDealer"]);
      data.append("is_customer", infos["isCustomer"]);
      data.append("personal_account", infos["isPersonalAccount"]);
      data.append("organisation_account", infos["isOrganizationAccount"]);
      data.append("type", infos["userType"]);
      data.append("mobile", infos["phone"]);
      data.append("area_pin", inputValue.areaPincode);
      data.append("state", inputValue.state);
      data.append("city", inputValue.city);
      data.append("address", inputValue.address);

      console.log(data);

      const response = await fetch(registrationUrl, {
        method: "POST",
        body: data,
        "Content-type": "multipart/form-data",
      });

      console.log(response);

      // recieve success response from backend
      if (response.ok) {
        setInputValue({
          areaPincode: "",
          state: "",
          city: "",
          address: "",
        });

        localStorage.removeItem("KTMinfo");

        dispatch(stepReducerActions.reset("customerSignUpPersonalStep"));
        dispatch(stepReducerActions.reset("customerSignUpOrganizationStep"));
        dispatch(stepReducerActions.reset("dealerSignUpStep"));

        Swal.fire({
          title: "Verification email sent",
          confirmButtonColor: "#56b124",
        });

        history.push("/signin");
      }

      // recieve failure response from backend
      else {
        const jsonResponse = await response.json();

        let error = "";
        for (let item in jsonResponse) {
          error += `${jsonResponse[item][0]}\n`;
        }

        setInputValue({
          areaPincode: "",
          state: "",
          city: "",
          address: "",
        });

        dispatch(stepReducerActions.reset("customerSignUpPersonalStep"));
        dispatch(stepReducerActions.reset("customerSignUpOrganizationStep"));
        dispatch(stepReducerActions.reset("dealerSignUpStep"));

        Swal.fire({
          title: error,
          confirmButtonColor: "#56b124",
        });

        // history.push("/signin/signup");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="section">
      <h1>Sign Up</h1>
      <p style={{ marginTop: "0", fontSize: "1rem" }} className="section__tab">
        (Add pincode & press TAB key to autocomplete other fileds)
      </p>

      <form className="form" onSubmit={signUp}>
        <TextField
          className="input"
          type="text"
          label="Your Area Pin Code"
          variant="outlined"
          name="areaPincode"
          value={inputValue.areaPincode}
          onChange={getInputValue}
          onKeyDown={getPincodeDetail}
          required
        />
        <TextField
          className="input"
          type="text"
          label="Your State"
          variant="outlined"
          name="state"
          value={inputValue.state}
          onChange={getInputValue}
          required
        />
        <TextField
          className="input"
          type="text"
          label="Your City"
          variant="outlined"
          name="city"
          value={inputValue.city}
          onChange={getInputValue}
          required
        />
        <TextField
          className="input"
          type="text"
          label="Your Address"
          variant="outlined"
          name="address"
          value={inputValue.address}
          onChange={getInputValue}
          required
        />
        <div>
          <button
            className="form__button"
            onClick={() => {
              switch (location.pathname) {
                case "/signin/signup/customer/personal":
                  dispatch(
                    stepReducerActions.backward("customerSignUpPersonalStep")
                  );
                  break;
                case "/signin/signup/customer/organization":
                  dispatch(
                    stepReducerActions.backward(
                      "customerSignUpOrganizationStep"
                    )
                  );
                  break;
                case "/signin/signup/dealer":
                  dispatch(stepReducerActions.backward("dealerSignUpStep"));
                  break;
                default:
                  break;
              }
            }}
          >
            Back
          </button>
          <button className="form__button" type="submit">
            Sign Up
          </button>
        </div>
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

export default SignUpAddressInfoStep;
