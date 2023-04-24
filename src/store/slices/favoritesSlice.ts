import { createSlice } from '@reduxjs/toolkit';
import { FavoritesState, State } from '../store';


export const favoritesInitialState: FavoritesState = {
  saved: {},
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: favoritesInitialState,
  reducers: {
    addFavorite: (state, action) => {
      state.saved = {...state.saved, [action.payload]: true}
    },
    removeFavorite: (state, action) => {
      const savedFavorites = state.saved;
      delete savedFavorites[action.payload]
      state.saved = savedFavorites;
    },
    clearFavorites: (state, action) => {
      state.saved = {};
    }
  },
});

export const { 
    addFavorite,
    removeFavorite,
    clearFavorites,
} = favoritesSlice.actions;
export const selectFavorites = (state: State) => state.favorites?.saved;
