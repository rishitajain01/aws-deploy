import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { stepReducerActions } from "../../Redux/stepReducer";

// css
import "../../Css/Cart.css";

// component
import Navbar from "../Navbar";
import UserProfileSearchbar from "../UserProfileSearchbar";
import CartStep1 from "./CartStep1";
import CartStep2 from "./CartStep2";
import CartStep3 from "./CartStep3";
import MainFooter from "../Footer/MainFooter";
import TermFooter from "../Footer/TermFooter";

const CartSection = () => {
  const dispatch = useDispatch();
  const cartStep = useSelector((state) => state.stepReducer.cartStep);
  const cart = useSelector((state) => state.cartReducer);

  const history = useHistory();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <UserProfileSearchbar />

      {(() => {
        if (cart.length !== 0) {
          if (cartStep === 1) {
            return <CartStep1 />;
          }
          if (cartStep === 2) {
            return <CartStep2 />;
          }
          if (cartStep === 3) {
            return <CartStep3 />;
          }
        } else {
          return (
            <div className="empty__cart">
              <h1>Your cart is empty</h1>
              <button
                className="cart__button"
                onClick={() => {
                  dispatch(stepReducerActions.reset("cartStep"));
                  history.push("/sell");
                }}
              >
                Go to sell page
              </button>
            </div>
          );
        }
      })()}

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default CartSection;
