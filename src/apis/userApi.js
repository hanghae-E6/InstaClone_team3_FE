import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

// 사용자 정보 조회
export const __getUserInfo = createAsyncThunk(
  "getUserInfo",
  async (payload, thunkAPI) => {
    const userId = payload;
    try {
      const response = await api.get(`/api/user/${userId}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const { status, data } = error.response;
      if (status === 404 || status === 400) {
        alert(data.errorMessage);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 팔로잉/팔로워 목록 조회
export const __getFollowList = createAsyncThunk(
  "getFollowList",
  async (payload, thunkAPI) => {
    const userId = payload;
    try {
      const response = await api.get(`/api/follow/${userId}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const { status, data } = error.response;
      if (status === 404 || status === 400) {
        alert(data.errorMessage);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 팔로잉/팔로우
export const __toggleFollow = createAsyncThunk(
  "toggleFollow",
  async (payload, thunkAPI) => {
    const userId = payload;
    try {
      const response = await api.put(`/api/follow/${userId}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const { status, data } = error.response;
      if (status === 404 || status === 400) {
        alert(data.errorMessage);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);
