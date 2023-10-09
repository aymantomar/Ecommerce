import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  isLoading: "abdo",
  data: null,
};

export let getLoginData = createAsyncThunk(
  "RegisterReducer/getRegisterData",
  async (values) => {
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,

        values
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

let LoginReducer = createSlice({
  name: "LoginReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLoginData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getLoginData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getLoginData.rejected, (state, action) => {
      //   state.data = action.payload;
      state.isLoading = false;
    });
  },

  // extraReducers: {
  //   [getLoginData.pending]: (state, action) => {
  //     state.isLoading = true;
  //     console.log("iam pending", state.isLoading);
  //   },
  //   [getLoginData.fulfilled]: (state, action) => {
  //     state.data = action.payload;
  //     state.isLoading = false;
  //   },
  //   [getLoginData.rejected]: (state, action) => {
  //     state.data = action.payload;
  //     state.isLoading = false;
  //   },
  // },
});

export let LoginSlice = LoginReducer.reducer;
