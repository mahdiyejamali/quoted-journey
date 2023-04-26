import { Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import QuoteWrapper, { QuoteText } from "./QuoteWrapper";
import { useDispatch } from "react-redux";
import { setQuoteText } from "../store/slices/quoteSlice";
import useFavorite from '../hooks/useFavorite';
import { Text, View } from 'native-base';

export type Category = "main" | "favorites";

export interface QuoteSwiperProps {
    quotesList: string[];
    themeKey: string;
    category: Category;
    downloadImage: () => void;
    shareToInstagram: () => void;
}

const DATA_SIZE = 2;
export default function QuoteSwiper(props: QuoteSwiperProps) {
    const dispatch = useDispatch();
    const {category} = props;

    const {favoriteQuotes, hasFavorites} = useFavorite();
    const quotesByCategory = category == 'favorites' ? favoriteQuotes : props.quotesList;
    const showEmptyFavorites = category == 'favorites' && !hasFavorites();

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return showEmptyFavorites ? (
        <QuoteText quoteText='Your favorites collection is empty.' />
    ) : (
        <Carousel
            loop={false}
            width={width}
            height={height}
            // autoPlay={true}
            vertical
            // mode="parallax"
            data={quotesByCategory}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => {
                dispatch(setQuoteText(quotesByCategory[index]));
            }}
            renderItem={({ index }) => (
                <QuoteWrapper 
                    {...props}
                    quoteText={quotesByCategory[index]} 
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'BalsamiqSans_700Bold',
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
  },
  pressableBackground: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  emptyFavoritesBackground: {
    backgroundColor: 'grey'
  }
});
