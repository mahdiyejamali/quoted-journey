import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { quoteSlice } from './slices/quoteSlice';
import { themeSlice } from './slices/themeSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { favoritesSlice } from './slices/favoritesSlice';
import { QuoteGenre } from '../providers/quotable';

export interface State {
    'quote': QuoteState,
    'theme': ThemeState,
    'favorites': FavoritesState,
}

export interface FontStyles {
    fontFamily: string;
    fontWeight?: number | undefined;
    fontStyle?: string | undefined;
}

export interface QuoteState {
    text: string;
    genre?: QuoteGenre;
}

export interface ThemeState {
    themeKey: string;
}

export interface FavoritesState {
    saved: {[key: string]: boolean};
}

const persistConfig = {
	key: "@QuotedJourney",
	version: 1,
	storage: AsyncStorage,
};

const rootReducer = combineReducers({
    [quoteSlice.name]: quoteSlice.reducer,
	[themeSlice.name]: themeSlice.reducer,
	[favoritesSlice.name]: favoritesSlice.reducer,
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
