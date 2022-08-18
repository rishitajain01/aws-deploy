import React, { useEffect } from "react";

// css
import "../../Css/Cart.css";

// redux
import { useDispatch } from "react-redux";
import { stepReducerActions } from "../../Redux/stepReducer";

const CartStep2 = () => {
  const dispatch = useDispatch();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="cart__step">
        <h1>Your Pickup Address</h1>
        <div className="cart__pickup__input">
          <div className="input">
            <div>
              <label>First Name</label>
              <input type="text" />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" />
            </div>
          </div>
          <div className="input">
            <div>
              <label>Mobile Number</label>
              <input type="tel" />
            </div>
            <div>
              <label>Email ID</label>
              <input type="email" disabled />
            </div>
          </div>
          <div className="input">
            <div>
              <label>Pincode</label>
              <input type="text" disabled />
            </div>
            <div>
              <label>State</label>
              <input type="text" disabled />
            </div>
          </div>
          <div className="input">
            <div>
              <label>House no. / Flat no.</label>
              <input type="text" />
            </div>
            <div>
              <label>Address</label>
              <input type="text" />
            </div>
          </div>
          <div className="input">
            <div>
              <label>Select Date</label>
              <input type="date" />
            </div>
            <div>
              <label>Select Time Slot</label>
              <select>
                <option>1:00 Pm to 3:00 Pm</option>
                <option>2:00 Pm to 5:00 Pm</option>
                <option>3:00 Pm to 6:00 Pm</option>
              </select>
            </div>
          </div>
        </div>

        <button
          className="cart__button"
          onClick={() => {
            dispatch(stepReducerActions.backward("cartStep"));
          }}
        >
          Back
        </button>
        <button
          className="cart__button"
          onClick={() => {
            dispatch(stepReducerActions.forward("cartStep"));
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CartStep2;
