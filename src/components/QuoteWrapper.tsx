import { Dimensions, StyleSheet } from 'react-native';
import { Box, Icon, IconButton, Text, View } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useFavorite from '../hooks/useFavorite';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
import { useDispatch } from 'react-redux';
import { selectThemeKey } from '../store/slices/themeSlice';
import { useSelector } from 'react-redux';
import { themeFontColors } from '../constants/themes';
import { memo } from 'react';

const MAIN_BUTTON_COLOR = "teal.500";
// https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/MaterialIcons.json

const QUOTE_ITEM_HEIGHT = Dimensions.get('window').height;
const QUOTE_ITEM_WIDTH = Dimensions.get('window').width;
export interface QuoteWrapperProps {
    quoteText: string;
    isFavorite: boolean;
    downloadImage: () => void;
    shareToInstagram: () => void;
}
function QuoteWrapper(props: QuoteWrapperProps) {
    const {quoteText, isFavorite, downloadImage, shareToInstagram} = props;
    const dispatch = useDispatch();
    const themeKey = useSelector(selectThemeKey);

    const onPressFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(quoteText))
        } else {
            dispatch(addFavorite(quoteText))
        }
    }

    return (
        <View style={styles.container} height={QUOTE_ITEM_HEIGHT}>
            <QuoteText quoteText={quoteText} />
            
            {!!quoteText && <Box style={styles.actionsBox}>
                <IconButton 
                    m={'8px'} 
                    borderRadius="full" 
                    variant="outline" 
                    p="3"
                    // bg="secondary" 
                    borderColor={MAIN_BUTTON_COLOR}
                    icon={<Icon color={themeFontColors[themeKey] || 'white'} name={isFavorite ? "favorite": "favorite-border"} as={MaterialIcons} size="lg" />} 
                    onPress={onPressFavorite}
                />

                <IconButton 
                    m={'8px'} 
                    borderRadius="full" 
                    variant="outline" 
                    p="3"
                    // bg="secondary" 
                    borderColor={MAIN_BUTTON_COLOR}
                    icon={<Icon color={themeFontColors[themeKey] || 'white'} name="file-download" as={MaterialIcons} size="lg" />} 
                    onPress={downloadImage}
                />

                <IconButton 
                    m={'8px'} 
                    borderRadius="full" 
                    variant="outline" 
                    p="3"
                    // bg="secondary"
                    borderColor={MAIN_BUTTON_COLOR}
                    icon={<Icon color={themeFontColors[themeKey] || 'white'} name="share" as={Ionicons} size="lg" />} 
                    onPress={shareToInstagram}
                />
            </Box>}
        </View>   
    );
}

const areEqual = (prevProps: QuoteWrapperProps, nextProps: QuoteWrapperProps) => {
    const { isFavorite } = nextProps;
    const { isFavorite: prevIsFavorite } = prevProps;
    
    /*if the props are equal, it won't update*/
    const isSelectedEqual = isFavorite === prevIsFavorite;
  
    return isSelectedEqual;
};

export default memo(QuoteWrapper, areEqual)

export const QuoteText = (props: {quoteText: string}) => {
    const themeKey = useSelector(selectThemeKey);
    return (
        <View style={styles.textWrapper}>
            <Text style={[styles.text, {color: themeFontColors[themeKey] || 'white'}]}>
                {props.quoteText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
    },
    actionsBox: {
        flexDirection: 'row',
        position: 'absolute', 
        bottom: 190, 
        alignSelf: 'center'
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 27,
    },
    text: {
        color: 'white',
        fontSize: 27,
        lineHeight: 32,
        textAlign: 'center',
        fontFamily: 'IndieFlower-Regular',
        fontWeight: 'bold',
        paddingVertical: 30,
        height: 'auto'
    },
});
