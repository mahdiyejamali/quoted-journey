import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearFavorites, selectFavorites } from "../store/slices/favoritesSlice";

export interface Favorite {
    themeKey: string;
    quoteText: string;
}
export default function useFavorite() {
    const dispatch = useDispatch();
    const savedFavorites = useSelector(selectFavorites);

    const SEPARATOR = '_____';
    const getFavoriteKey = (themeKey: string, quoteText: string) => 
        `${themeKey}${SEPARATOR}${quoteText}`;
    
    const getFavoriteDatafromKey = (key: string): Favorite => {
        const splitText = key.split(SEPARATOR);
        return {
            themeKey: splitText[0],
            quoteText: splitText[1],
        }
    }

    const isFavoriteSaved = (favoriteKey: string) => {
        return !!savedFavorites[favoriteKey];
    }

    const removeAllFavorites = () => {
        dispatch(clearFavorites({}));
    }

    const hasFavorites = () => {
        return !!Object.keys(savedFavorites).length
    }

    return {
        savedFavorites: Object.keys(savedFavorites),
        getFavoriteKey,
        getFavoriteDatafromKey,
        isFavoriteSaved,
        removeAllFavorites,
        hasFavorites,
    }
}