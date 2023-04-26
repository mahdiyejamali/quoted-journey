import { createSlice } from '@reduxjs/toolkit';

import { State } from '../store';

export const themeInitialState = {
    themeKey: '1',
    currentFavoriteIndex: 0,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: themeInitialState,
  reducers: {
    setThemeKey: (state, action) => {
        state.themeKey = action.payload;
    },
  },
});

export const { setThemeKey } = themeSlice.actions;
export const selectThemeKey = (state: State) => state.theme?.themeKey;
