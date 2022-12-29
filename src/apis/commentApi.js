import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

// 댓글 등록
export const __addComment = createAsyncThunk(
  "addComment",
  async (payload, thunkAPI) => {
    const { postId, comment } = payload;
    try {
      const response = await api.post(`api/posts/${postId}/comments`, {
        comment,
      });
      console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const { status, data } = error.response;
      if (status === 404 || status === 401) {
        alert(data.errorMessage);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 댓글 삭제
export const __removeComment = createAsyncThunk(
  "removeComment",
  async (payload, thunkAPI) => {
    const { postId, commentId } = payload;
    try {
      const response = await api.delete(
        `api/posts/${postId}/comments/${commentId}`
      );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const { status, data } = error.response;
      if (status === 404 || status === 401) {
        alert(data.errorMessage);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);
