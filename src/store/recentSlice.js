import { createSlice } from '@reduxjs/toolkit';

const recentSlice = createSlice({
  name: 'recent',
  initialState: {
    list: [],
  },
  reducers: {
    addRecentSong: (state, action) => {
      const exists = state.list.find(song => song.id === action.payload.id);
      if (!exists) {
        state.list.unshift(action.payload);
      }
    },
  },
});

export const { addRecentSong } = recentSlice.actions;
export default recentSlice.reducer;
