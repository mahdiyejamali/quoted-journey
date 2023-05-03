
import React, { useCallback } from 'react';
import { FlatList, Dimensions, ViewToken, ListRenderItem } from 'react-native';
import { useDispatch } from "react-redux";

import QuoteWrapper, { QuoteText } from "./QuoteWrapper";
import { setQuoteText } from "../store/slices/quoteSlice";
import useFavorite from '../hooks/useFavorite';
import { useSelector } from 'react-redux';
import { selectNotificationQuote } from '../store/slices/notificationSlice';

const QUOTE_ITEM_HEIGHT = Dimensions.get('window').height;

export type Category = "main" | "favorites";

export interface QuoteSwiperProps {
    quotesList: string[];
    category: Category;
    downloadImage: () => void;
    shareToInstagram: () => void;
}

export default function QuoteSwiper(props: QuoteSwiperProps) {
    const {category} = props;
    let quotesList = props.quotesList;
    const dispatch = useDispatch();

    const notificationQuote = useSelector(selectNotificationQuote);

    const {favoriteQuotes, hasFavorites, isFavoriteSaved} = useFavorite();
    let quotesByCategory = category == 'favorites' ? favoriteQuotes : quotesList;
    const showEmptyFavorites = category == 'favorites' && !hasFavorites();

    if (category != 'favorites' && notificationQuote) {
        quotesByCategory = [notificationQuote].concat(quotesByCategory);
    }

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

    const getItemLayout = (item: any, index: number) => ({
        length: QUOTE_ITEM_HEIGHT,
        offset: QUOTE_ITEM_HEIGHT * index,
        index,
    })

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
            disableIntervalMomentum
            snapToInterval={QUOTE_ITEM_HEIGHT}
            data={quotesByCategory}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            // maxToRenderPerBatch={10}
            keyExtractor={keyExtractor}
            onViewableItemsChanged={onViewableItemsChangedCallback}
            viewabilityConfig={{itemVisiblePercentThreshold: 50}}
            onEndReachedThreshold={0.1}
        />
    );
}
