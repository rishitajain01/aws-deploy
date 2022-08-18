import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartReducer = createSlice({
  name: "cart reducer",
  initialState,
  reducers: {
    add: (state, action) => {
      return [...state, action.payload.item];
    },
    remove: (state, action) => {
      const newState = state.filter((eachItem, eachItemIndex) => {
        return eachItemIndex !== action.payload;
      });
      return newState;
    },
    reset: () => {
      return [];
    },
  },
});

export const cartReducerActions = cartReducer.actions;
export default cartReducer.reducer;
