import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  isLoading: false,
  data: null,
};

export let getRegisterData = createAsyncThunk(
  "RegisterReducer/getRegisterData",
  async (values) => {
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,

        values
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

let RegisterReducer = createSlice({
  name: "RegisterReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getRegisterData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getRegisterData.fulfilled, (state, action) => {
      // console.log(action);
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getRegisterData.rejected, (state, action) => {
      console.log(state);
      //   state.data = action.payload;
      state.isLoading = false;
    });
  },
});

export let RegisterSlice = RegisterReducer.reducer;
