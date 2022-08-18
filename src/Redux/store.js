import { configureStore } from "@reduxjs/toolkit";

// reducer
import stepReducer from "./stepReducer";
import cartReducer from "./cartReducer";
import itemNameReducer from "./itemNameReducer";

const store = configureStore({
  reducer: { stepReducer, cartReducer, itemNameReducer },
});

export default store;
