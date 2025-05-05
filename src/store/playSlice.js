import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  playlist: [],
};

const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
    },
    setPlaylist(state, action) {
      state.playlist = action.payload;
    },
  },
});

export const { setCurrentSong, setPlaylist } = playSlice.actions;
export default playSlice.reducer;
