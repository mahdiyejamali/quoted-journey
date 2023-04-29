import { createSlice } from '@reduxjs/toolkit';
import { State } from '../store';

export const quoteInitialState = {
    text: '',
    genre: 'life'
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState: quoteInitialState,
  reducers: {
    setQuoteText: (state, action) => {
        state.text = action.payload;
    },
    setQuoteGenre: (state, action) => {
      state.genre = action.payload;
  },
  },
});

export const { 
    setQuoteText, 
    setQuoteGenre,
} = quoteSlice.actions;
export const selectQuoteText = (state: State) => state.quote?.text;
export const selectQuoteGenre = (state: State) => state.quote?.genre;
