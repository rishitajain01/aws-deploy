import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

// css
import "../../Css/Cart.css";
import "../../App.css";

// component
import CartTable from "./CartTable";

// redux
import { useDispatch } from "react-redux";
import { stepReducerActions } from "../../Redux/stepReducer";
import { cartReducerActions } from "../../Redux/cartReducer";

const CartStep3 = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="cart__step">
        <h1>Final Checkout</h1>

        <CartTable />

        <div className="final__pickup__address">
          <h1>Pickup Address</h1>
          <div className="pickup__address">
            <div className="left__side">
              <p>
                Name : <span>Debojyoti Ghosh</span>
              </p>
              <p>
                Mobile Number : <span>8944837858</span>
              </p>
              <p>
                Email ID : <span>debojyotighosh060#gmail.com</span>
              </p>
              <p>
                Address : <span>Mahananda Pally</span>
              </p>
              <p>
                State : <span>West Bengal</span>
              </p>
            </div>
            <div className="right__side">
              <p>
                Pincode : <span>732102</span>
              </p>
              <p>
                House no. / Flat no. : <span>147A</span>
              </p>
              <p>
                Date : <span>20/06/2021</span>
              </p>
              <p>
                Time Slot : <span>2:00 Pm to 5:00 Pm</span>
              </p>
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
            setIsOpen(!isOpen);
          }}
        >
          Check out
        </button>

        <Modal
          className="modal__content"
          overlayClassName="modal__overlay"
          isOpen={isOpen}
          ariaHideApp={false}
        >
          <h1>Thanks</h1>
          <p>Your pickup request is placed</p>
          <div>
            <button
              onClick={() => {
                dispatch(cartReducerActions.reset());
                dispatch(stepReducerActions.reset("cartStep"));
                setIsOpen(!isOpen);
                history.push("/sell");
              }}
            >
              Sell again
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CartStep3;
