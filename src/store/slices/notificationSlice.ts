import { createSlice } from '@reduxjs/toolkit';

import { State } from '../store';

export const notificationInitialState = {
  status: false,
  time: undefined,
  frequency: undefined,
  lastQuote: undefined,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationInitialState,
  reducers: {
    setNotificationStatus: (state, action) => {
        state.status = action.payload;
    },
    setNotificationTime: (state, action) => {
      state.time = action.payload;
    },
    setNotificationFrequency: (state, action) => {
      state.frequency = action.payload;
    },
    setNotificationQuote: (state, action) => {
      state.lastQuote = action.payload;
    },
  },
});

export const { 
  setNotificationStatus,
  setNotificationTime,
  setNotificationFrequency,
  setNotificationQuote,
} = notificationSlice.actions;
export const selectNotificationStatus = (state: State) => state.notification?.status;
export const selectNotificationTime = (state: State) => state.notification?.time;
export const selectNotificationFrequency = (state: State) => state.notification?.frequency;
export const selectNotificationQuote = (state: State) => state.notification?.lastQuote;
