import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { Box, Icon, IconButton, View } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useDownloadImage from '../hooks/useDownloadImage';
import useAudio from '../hooks/useAudio';

import { themeSources } from '../constants/themes';
import CustomToast from './CustomToast';
import { selectThemeKey } from '../store/slices/themeSlice';
import { useSelector } from 'react-redux';
import QuoteSwiper, { Category } from './QuoteSwiper';
import { QuoteText } from './QuoteWrapper';
import { selectQuoteText } from '../store/slices/quoteSlice';

const MAIN_BUTTON_COLOR = "teal.500";
// https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/MaterialIcons.json

export interface MainWrapperProps {
    quotesList: string[];
    category: Category;
    openDrawer: () => void;
}
export default function MainWrapper(props: MainWrapperProps) {
    const {quotesList, category, openDrawer} = props;
    const themeKey = useSelector(selectThemeKey);

    const {isPlaying, playAudio, stopAudio} = useAudio();
    const {viewRef, downloadImage, shareToInstagram} = useDownloadImage<ImageBackground>({
        renderSuccessToast: () => <CustomToast status='success' title='Saved in photos!' />,
        renderFailureToast: () => <CustomToast status='error' title='Something went wrong.' />
    });

    return (
        <View style={styles.container}>
            {/* Hidden downloadable view */}
            <View ref={viewRef} 
                style={[styles.container, {position: 'absolute', left: Dimensions.get('window').width}]}
            >
                <View style={{flex: 1}}>
                    <ImageBackground source={themeSources[themeKey]} style={styles.backgroundImage}>
                        <QuoteText quoteText={useSelector(selectQuoteText)} />
                    </ImageBackground>
                </View>
            </View>

            <ImageBackground  source={themeSources[themeKey]} style={styles.backgroundImage}>
                <QuoteSwiper 
                    quotesList={quotesList}
                    category={category}
                    downloadImage={downloadImage} 
                    shareToInstagram={shareToInstagram} 
                />
            </ImageBackground>

            <Box style={[styles.mainButtons, styles.leftBox]}>
                <IconButton 
                    m={'8px'} 
                    borderRadius="full" 
                    variant="solid" 
                    p="3"
                    bg={MAIN_BUTTON_COLOR}
                    icon={<Icon color="white" name="menu" as={MaterialIcons} size="lg" />} 
                    onPress={openDrawer}
                />
            </Box>

            <Box style={[styles.mainButtons, styles.rightBox]}>
                {isPlaying ? <IconButton 
                    m={'8px'} 
                    borderRadius="full" 
                    variant="solid" 
                    p="3"
                    bg={MAIN_BUTTON_COLOR}
                    icon={<Icon color="white" name="volume-mute-outline" as={Ionicons} size="lg" />}
                    onPress={stopAudio}
                /> :
                <IconButton 
                    m={'8px'} 
                    borderRadius="full" 
                    variant="solid" 
                    p="3"
                    bg={MAIN_BUTTON_COLOR}
                    icon={<Icon color="white" name="volume-high-outline" as={Ionicons} size="lg" />} 
                    onPress={playAudio}
                />}
            </Box>
        </View>   
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    backgroundImage: {
        flex: 1,
    },
    mainButtons: {
        position: 'absolute', 
        bottom: 70, 
    },
    leftBox: {
        left: 30,
    },
    rightBox: {
        right: 30,
    },
});
