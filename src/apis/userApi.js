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
      return thunkAPI.rejectWithValue(error);
    }
  }
);
