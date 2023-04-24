import { createSlice } from '@reduxjs/toolkit';
import { State } from '../store';


export const quoteInitialState = {
    text: '',
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState: quoteInitialState,
  reducers: {
    setQuoteText: (state, action) => {
        state.text = action.payload;
    },
  },
});

export const { 
    setQuoteText, 
} = quoteSlice.actions;
export const selectQuoteText = (state: State) => state.quote?.text;
