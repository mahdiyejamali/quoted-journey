import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { quoteSlice } from './slices/quoteSlice';
import { themeSlice } from './slices/themeSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface State {
    'quote': QuoteState,
    'theme': ThemeState,
}

export interface FontStyles {
    fontFamily: string;
    fontWeight?: number | undefined;
    fontStyle?: string | undefined;
}

export interface QuoteState {
    text: string;
}

export interface ThemeState {
    themeKey: string;
}

const persistConfig = {
	key: "@QuotedJourney",
	version: 1,
	storage: AsyncStorage,
};

const rootReducer = combineReducers({
    [quoteSlice.name]: quoteSlice.reducer,
	[themeSlice.name]: themeSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
