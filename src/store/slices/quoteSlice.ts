import { createSlice } from '@reduxjs/toolkit';
import { State } from '../store';


export const quoteInitialState = {
    text: '',
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState: quoteInitialState,
  reducers: {
    setText: (state, action) => {
        state.text = action.payload;
    },
  },
});

export const { 
    setText, 
} = quoteSlice.actions;
export const selectText = (state: State) => state.quote?.text;
