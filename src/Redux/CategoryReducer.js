import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isError } from "react-query";
let initialState = {
  category: null,
  isLoading: false,
  isError: null,
};

export let getCategory = createAsyncThunk(
  "categoryReducer/getCategory",
  async () => {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );

      return data;
    } catch (error) {
      return error;
    }

    // let { data } = await axios
    //   .get(`https://ecommerce.routemisr.com/api/v1/categories`)
    //   .catch((error) => console.log("iam the errror", error));
    // console.log("hello iam response", data);
    // return data;
  }
);

export let categoryReducer = createSlice({
  name: "categoryReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    });
  },
});
export let categorySlice = categoryReducer.reducer;
