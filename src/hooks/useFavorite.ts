import { useDispatch, useSelector } from "react-redux";
import { clearFavorites, selectFavorites } from "../store/slices/favoritesSlice";

export default function useFavorite() {
    const dispatch = useDispatch();
    const favoriteQuotes = useSelector(selectFavorites);

    const isFavoriteSaved = (quote: string) => {
        return !!favoriteQuotes[quote];
    }

    const removeAllFavorites = () => {
        dispatch(clearFavorites({}));
    }

    const hasFavorites = () => {
        return !!Object.keys(favoriteQuotes).length;
    }

    return {
        favoriteQuotes: Object.keys(favoriteQuotes),
        isFavoriteSaved,
        removeAllFavorites,
        hasFavorites,
    }
}