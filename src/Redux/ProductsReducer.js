import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  products: null,
  isLoading: false,
  isError: null,
};

export let getProducts = createAsyncThunk(
  "productsReducer/getProducts",
  async () => {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );

      return data;
    } catch (error) {
      return error;
    }
  }
);

let productsReducer = createSlice({
  name: "productsReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      console.log("product details ", state.productDetails);
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});
export let productsSlice = productsReducer.reducer;
