import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  productDetails: null,
  isLoading: false,
  isError: null,
};

export let getproductDetailsData = createAsyncThunk(
  "homeProductsReducer/getHomeProducts",
  async (id) => {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );

      return data;
    } catch (error) {
      return error;
    }
  }
);

let productDetailsReducer = createSlice({
  name: "homeProductsReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getproductDetailsData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getproductDetailsData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productDetails = action.payload;
      // console.log("product details ", state.productDetails);
    });
    builder.addCase(getproductDetailsData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});
export let productDetailsSlice = productDetailsReducer.reducer;
