import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "./api";

// 댓글 번역하기
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
