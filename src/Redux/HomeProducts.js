import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  homeProducts: null,
  isLoading: false,
  isError: null,
};

export let getHomeProducts = createAsyncThunk(
  "homeProductsReducer/getHomeProducts",
  async () => {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

let homeProductsReducer = createSlice({
  name: "homeProductsReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getHomeProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getHomeProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.homeProducts = action.payload;
    });
    builder.addCase(getHomeProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});
export let homeProductSlice = homeProductsReducer.reducer;
