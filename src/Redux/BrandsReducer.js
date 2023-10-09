import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isError } from "react-query";
let initialState = {
  brands: null,
  isLoading: false,
  isError: null,
};

export let getBrands = createAsyncThunk("brandsReducer/getBrands", async () => {
  try {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );

    return data;
  } catch (error) {
    return error;
  }
});

export let brandsReducer = createSlice({
  name: "brandsReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    });
  },
});
export let brandsSlice = brandsReducer.reducer;
