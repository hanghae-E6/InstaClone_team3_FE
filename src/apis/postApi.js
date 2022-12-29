import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import { imageApi } from "./api";

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

//게시글 등록
export const __addPost = createAsyncThunk(
  "addPost",
  async (payload, thunkAPI) => {
    try {
      const res = await imageApi.post("/api/posts", payload.formData);
      alert(res.data.message);
      payload.navigate(-1);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (e) {
      alert(e.response.data.errorMessage);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//게시글 수정
export const __modifyPost = createAsyncThunk(
  "modifiyPost",
  async (payload, thunkAPI) => {
    const postId = payload.postId;
    try {
      const res = await imageApi.put(`api/posts/${postId}`, payload.formData);
      alert(res.data.message);
      payload.navigate(`/posts/${postId}`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (e) {
      alert(e.response.data.errorMessage);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//게시글 삭제
export const __deletePost = createAsyncThunk(
  "deletePost",
  async (payload, thunkAPI) => {
    const postId = payload.postId;
    try {
      const res = await api.delete(`api/posts/${postId}`, postId);
      alert(res.data.message);
      payload.navigate(-1);
    } catch (e) {
      alert(e.response.data.errorMessage);
    }
  }
);
