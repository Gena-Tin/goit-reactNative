import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateCommentsToPost: (state, { payload }) => ({
      ...state,
      comments: payload,
    }),
  },
})