import { StyleSheet } from 'react-native';
import { Box, Icon, IconButton, Text, View } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useFavorite from '../hooks/useFavorite';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
import { useDispatch } from 'react-redux';

const MAIN_BUTTON_COLOR = "teal.500";
// https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/MaterialIcons.json

export interface QuoteWrapperProps {
    quoteText: string;
    themeKey: string;
    downloadImage: () => void;
    shareToInstagram: () => void;
}
export default function QuoteWrapper(props: QuoteWrapperProps) {
    const {quoteText, themeKey, downloadImage, shareToInstagram} = props;
    const dispatch = useDispatch();

    const {isFavoriteSaved} = useFavorite();
    const isFavorite = isFavoriteSaved(quoteText);
    const onPressFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(quoteText))
        } else {
            dispatch(addFavorite(quoteText))
        }
    }

    return (
        <View style={styles.container}>
            <QuoteText quoteText={quoteText} />
            
            {!!quoteText && <Box style={styles.actionsBox}>
                <IconButton 
                    m={'8px'} 
                    borderRadius="full" 
                    variant="outline" 
                    p="3"
                    // bg="secondary" 
                    borderColor={MAIN_BUTTON_COLOR}
                    icon={<Icon color="white" name={isFavorite ? "favorite": "favorite-border"} as={MaterialIcons} size="lg" />} 
                    onPress={onPressFavorite}
                />

                <IconButton 
                    m={'8px'} 
                    borderRadius="full" 
                    variant="outline" 
                    p="3"
                    // bg="secondary" 
                    borderColor={MAIN_BUTTON_COLOR}
                    icon={<Icon color="white" name="file-download" as={MaterialIcons} size="lg" />} 
                    onPress={downloadImage}
                />

                <IconButton 
                    m={'8px'} 
                    borderRadius="full" 
                    variant="outline" 
                    p="3"
                    // bg="secondary"
                    borderColor={MAIN_BUTTON_COLOR}
                    icon={<Icon color="white" name="share" as={Ionicons} size="lg" />} 
                    onPress={shareToInstagram}
                />
            </Box>}
        </View>   
    );
}

export const QuoteText = (props: {quoteText: string}) => (
    <View style={styles.textWrapper}>
        <Text style={styles.text}>
            {props.quoteText}
        </Text>
    </View>
)

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
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'BalsamiqSans_700Bold',
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
});
