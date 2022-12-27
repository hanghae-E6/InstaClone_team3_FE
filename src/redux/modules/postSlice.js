import { createSlice } from "@reduxjs/toolkit";
import { __getPostsByPageno } from "../../apis/postApi";

const initialState = {
  posts: [],
  error: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // __getPostsByPageno
      .addCase(__getPostsByPageno.pending, (state) => {
        state.error = null;
      })
      .addCase(__getPostsByPageno.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(__getPostsByPageno.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {} = postSlice.actions;
export default postSlice;
