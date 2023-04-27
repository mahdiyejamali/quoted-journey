// import { Dimensions, StyleSheet } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';
// import QuoteWrapper, { QuoteText } from "./QuoteWrapper";
// import { useDispatch } from "react-redux";
// import { setQuoteText } from "../store/slices/quoteSlice";
// import useFavorite from '../hooks/useFavorite';

// export type Category = "main" | "favorites";

// export interface QuoteSwiperProps {
//     quotesList: string[];
//     themeKey: string;
//     category: Category;
//     downloadImage: () => void;
//     shareToInstagram: () => void;
// }

// const DATA_SIZE = 2;
// export default function QuoteSwiper(props: QuoteSwiperProps) {
//     const dispatch = useDispatch();
//     const {category} = props;

//     const {favoriteQuotes, hasFavorites} = useFavorite();
//     const quotesByCategory = category == 'favorites' ? favoriteQuotes : props.quotesList;
//     const showEmptyFavorites = category == 'favorites' && !hasFavorites();

//     const width = Dimensions.get('window').width;
//     const height = Dimensions.get('window').height;

//     return showEmptyFavorites ? (
//         <QuoteText quoteText='Your favorites collection is empty.' />
//     ) : (
//         <Carousel
//             loop={false}
//             width={width}
//             height={height}
//             // autoPlay={true}
//             vertical
//             // mode="parallax"
//             data={quotesByCategory}
//             scrollAnimationDuration={1000}
//             onSnapToItem={(index) => {
//                 dispatch(setQuoteText(quotesByCategory[index]));
//             }}
//             renderItem={({ index }) => (
//                 <QuoteWrapper 
//                     {...props}
//                     quoteText={quotesByCategory[index]} 
//                 />
//             )}
//         />
//     );
// }

// const styles = StyleSheet.create({
//   text: {
//     color: 'white',
//     fontSize: 20,
//     textAlign: 'center',
//     fontFamily: 'BalsamiqSans_700Bold',
//     fontWeight: 'bold',
//     marginLeft: 20,
//     marginRight: 20,
//   },
//   pressableBackground: {
//     flex: 1,
//     resizeMode: 'contain',
//     justifyContent: 'center',
//     width: '100%',
//     height: '100%',
//   },
//   emptyFavoritesBackground: {
//     backgroundColor: 'grey'
//   }
// });


import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Dimensions, ViewToken } from 'react-native';
import QuoteWrapper, { QuoteText } from "./QuoteWrapper";
import { useDispatch } from "react-redux";
import { setQuoteText } from "../store/slices/quoteSlice";
import useFavorite from '../hooks/useFavorite';

const QUOTE_ITEM_HEIGHT = Dimensions.get('window').height;
const QUOTE_ITEM_WIDTH = Dimensions.get('window').width;
export type Category = "main" | "favorites";

export interface QuoteSwiperProps {
    quotesList: string[];
    themeKey: string;
    category: Category;
    downloadImage: () => void;
    shareToInstagram: () => void;
}

const BATCH_SIZE = 10;
export default function QuoteSwiper(props: QuoteSwiperProps) {
    const {category} = props;
    const dispatch = useDispatch();

    const {favoriteQuotes, hasFavorites} = useFavorite();
    const quotesByCategory = category == 'favorites' ? favoriteQuotes : props.quotesList;
    const showEmptyFavorites = category == 'favorites' && !hasFavorites();

    const [isLoading, setIsLoading] = useState(false);
    const [quotes, setQuotes] = useState<string[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        const startIndex = (page - 1) * BATCH_SIZE;
        const endIndex = startIndex + BATCH_SIZE;
        const newQuotes = quotesByCategory.slice(startIndex, endIndex);
        setQuotes([...quotes, ...newQuotes]);
        setIsLoading(false);
    }, [page, quotesByCategory.length]);

    const renderFooter = () => {
        if (!isLoading) return null;
        return (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    const handleLoadMore = () => {
        if (!isLoading) {
            setPage(page + 1);
        }
    };

    const onViewableItemsChanged = ({viewableItems}: {
        viewableItems: ViewToken[], changed: ViewToken[]
    }) => {
        const viewableItem = viewableItems?.[0];
        // Set current quote text as user swipes
        viewableItem && dispatch(setQuoteText(viewableItem.item));
    };
    const onViewableItemsChangedCallback = useCallback(onViewableItemsChanged, []);

    return showEmptyFavorites ? (
        <QuoteText quoteText='Your favorites collection is empty.' />
    ) : (
        <FlatList
            // snapToAlignment={'start'}
            disableIntervalMomentum
            snapToInterval={QUOTE_ITEM_HEIGHT}
            data={quotes}
            renderItem={({ item }) => (
                <QuoteWrapper 
                    {...props}
                    quoteText={item} 
                />
            )}
            keyExtractor={(_, index) => index.toString()}
            onViewableItemsChanged={onViewableItemsChangedCallback}
            viewabilityConfig={{itemVisiblePercentThreshold: 50}}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
        />
    );
}
