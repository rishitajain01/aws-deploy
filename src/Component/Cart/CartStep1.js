import React, { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { stepReducerActions } from "../../Redux/stepReducer";

// css
import "../../Css/Cart.css";

// component
import CartTable from "./CartTable";

const CartStep1 = () => {
  const dispatch = useDispatch();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="cart__step">
        <h1>Your Cart</h1>

        <CartTable />

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

export default CartStep1;
