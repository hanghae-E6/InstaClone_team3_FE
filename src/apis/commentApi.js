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
      const { errorMessage } = error.response.data;
      alert(errorMessage);
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
      console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const { errorMessage } = error.response.data;
      alert(errorMessage);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 댓글 번역
export const __getTranslatedText = createAsyncThunk(
  "getTranslatedText",
  async (payload, thunkAPI) => {
    // To-Do: 로컬 테스트서버 -> 백엔드 api서버
    // try {
    //   const text = "hi! my name is jeonyujin.";
    //   const response = await api.get(
    //     `http://127.0.0.1:4000/translate?text=${text}`
    //   );
    //   console.log(
    //     "==========================번역결과=============================="
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error);
    // }
  }
);
