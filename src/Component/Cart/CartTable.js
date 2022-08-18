import React from "react";

// css
import "../../Css/Cart.css";

// material icon
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// redux
import { useSelector, useDispatch } from "react-redux";
import { cartReducerActions } from "../../Redux/cartReducer";

const CartTable = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);

  // delete cart item
  const deleteCartItem = (index) => {
    dispatch(cartReducerActions.remove(index));
  };

  return (
    <div className="cart__table">
      <p>(Scroll left-right to see the full table)</p>
      <table>
        <tr>
          {/* <th>S.NO</th> */}
          <th>Scrap Name</th>
          <th>Price (Rs)</th>
          <th>Approx. Quantity</th>
          <th>Approx. Total (Rs)</th>
          <th>Action</th>
        </tr>
        {cart.map((eachItem, eachItemIndex) => {
          return (
            <tr key={eachItemIndex}>
              {/* <td></td> */}
              <td>{eachItem.name}</td>
              <td>{eachItem.price}</td>
              <td>{eachItem.quantity}</td>
              <td>{eachItem.totalPrice}</td>
              <td>
                {
                  <button onClick={deleteCartItem.bind(this, eachItemIndex)}>
                    <DeleteForeverIcon />
                  </button>
                }
              </td>
            </tr>
          );
        })}
      </table>
      <h1>
        Approx. Grand Total :
        <span>{cart.reduce((acc, curr) => acc + curr.totalPrice, 0)} Rs</span>
      </h1>
    </div>
  );
};

export default CartTable;
