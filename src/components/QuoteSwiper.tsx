
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
