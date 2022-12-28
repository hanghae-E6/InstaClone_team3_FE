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
      const { status, data } = error.response;
      if (status === 404) {
        alert(data.errorMessage);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 특정 유저 게시글 조회
export const __getPostsByUserId = createAsyncThunk(
  "getPostsByUserId",
  async (payload, thunkAPI) => {
    try {
      const userId = payload;
      const response = await api.get(`/api/posts/user/${userId}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const { status, data } = error.response;
      if (status === 404) {
        alert(data.errorMessage);
      }
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
      // const { status, data } = error.response;
      // if (status === 404) {
      //   alert(data.errorMessage);
      // }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 게시글 상세조회
export const __getPostDetail = createAsyncThunk(
  "getPostDetail",
  async (payload, thunkAPI) => {
    const postId = payload;
    try {
      const response = await api.get(`/api/posts/${postId}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const { status, data } = error.response;
      if (status === 404) {
        console.log(data.errorMessage);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 게시글 좋아요
export const __togglePostLikes = createAsyncThunk(
  "togglePostLikes",
  async (payload, thunkAPI) => {
    const postId = payload;
    try {
      const response = await api.put(`/api/posts/${postId}/like`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const { status, data } = error.response;
      if (status === 400) {
        console.log(data.errorMessage);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);
