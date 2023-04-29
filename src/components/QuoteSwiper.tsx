
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Dimensions, ViewToken, ListRenderItem } from 'react-native';
import { useDispatch } from "react-redux";

import QuoteWrapper, { QuoteText } from "./QuoteWrapper";
import { setQuoteText } from "../store/slices/quoteSlice";
import useFavorite from '../hooks/useFavorite';

const QUOTE_ITEM_HEIGHT = Dimensions.get('window').height;
const QUOTE_ITEM_WIDTH = Dimensions.get('window').width;
export type Category = "main" | "favorites";

export interface QuoteSwiperProps {
    quotesList: string[];
    category: Category;
    downloadImage: () => void;
    shareToInstagram: () => void;
}

export default function QuoteSwiper(props: QuoteSwiperProps) {
    const {category} = props;
    const dispatch = useDispatch();

    const {favoriteQuotes, hasFavorites, isFavoriteSaved} = useFavorite();
    const quotesByCategory = category == 'favorites' ? favoriteQuotes : props.quotesList;
    const showEmptyFavorites = category == 'favorites' && !hasFavorites();

    // const [isLoading, setIsLoading] = useState(false);
    // const [quotes, setQuotes] = useState<string[]>([]);
    // const [page, setPage] = useState(1);

    // const BATCH_SIZE = 5;
    // useEffect(() => {
    //     setIsLoading(true);
    //     const startIndex = (page - 1) * BATCH_SIZE;
    //     const endIndex = startIndex + BATCH_SIZE;
    //     const newQuotes = quotesByCategory.slice(startIndex, endIndex);
    //     setQuotes([...quotes, ...newQuotes]);
    //     setIsLoading(false);
    // }, [page, quotesByCategory.length]);

    // const renderFooter = () => {
    //     if (!isLoading) return null;
    //     return (
    //         <View style={{ paddingVertical: 20 }}>
    //             <ActivityIndicator animating size="large" />
    //         </View>
    //     );
    // };

    // const handleLoadMore = () => {
    //     if (!isLoading) {
    //         setPage(page + 1);
    //     }
    // };

    const renderItem: ListRenderItem<string> = ({ item }) => {
        const isFavorite = isFavoriteSaved(item);
        return (
            <QuoteWrapper 
                {...props}
                quoteText={item} 
                isFavorite={isFavorite}
            />
        )
    };

    const getItemLayout = (item: any, index: number) => (
        { length: QUOTE_ITEM_HEIGHT, offset: QUOTE_ITEM_HEIGHT * index, index }
    )

    const keyExtractor = (item: string, index: number) => item.toString()

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
            data={quotesByCategory}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            // maxToRenderPerBatch={10}
            keyExtractor={keyExtractor}
            onViewableItemsChanged={onViewableItemsChangedCallback}
            viewabilityConfig={{itemVisiblePercentThreshold: 50}}
            // ListFooterComponent={renderFooter}
            // onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
        />
    );
}
