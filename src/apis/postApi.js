import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

// 게시글 전체조회
export const __getPosts = createAsyncThunk(
  "getPosts",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/api/posts`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 게시글 페이지네이션 조회
export const __getPostsByPageno = createAsyncThunk(
  "getPostsByPageno",
  async (payload, thunkAPI) => {
    const pageno = payload;
    try {
      const response = await api.get(`/api/posts/page?pageno=${pageno}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
