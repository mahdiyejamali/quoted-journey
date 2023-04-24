import GestureRecognizer from 'react-native-swipe-gestures';
import { Modal, View,StyleSheet, Dimensions } from 'react-native';
import { Box, Heading, HStack, Image, Pressable, ScrollView, VStack } from 'native-base';
import { useDispatch } from 'react-redux';
import { themeSources } from '../constants/themes';
import { setThemeKey } from '../store/slices/themeSlice';

interface BottomDrawer extends CategoriesProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}
export default function BottomDrawer(props: BottomDrawer) {
    const {isOpen, setIsOpen, ...categoriesProps} = props;
    const windowHeight = Dimensions.get('window').height;

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <GestureRecognizer
            // onSwipeDown={() => setIsOpen(false)}
            // config={{velocityThreshold: 0.8, directionalOffsetThreshold: 150}}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpen}
                // onRequestClose={handleClose}
            >
                <View style={[styles.bottomSheet, { height: windowHeight * 0.85 }]}>
                    <Heading style={{margin: 15}}>Categories</Heading>
                    <Categories {...categoriesProps} />

                    <Heading style={{margin: 15}}>Themes</Heading>
                    <Themes />
                </View>
            </Modal>
        </GestureRecognizer>
    )
}

const Themes = () => {
    return (
        <ScrollView>
        <VStack space={3}>
            <HStack space={5} justifyContent="center">
                <Theme themeKey="1" />
                <Theme themeKey="2" />
            </HStack>
            <HStack space={5} justifyContent="center">
                <Theme themeKey="3" />
                <Theme themeKey="4" />
            </HStack>
            <HStack space={5} justifyContent="center">
                <Theme themeKey="5" />
                <Theme themeKey="6" />
            </HStack>
            <HStack space={5} justifyContent="center">
                <Theme themeKey="7" />
                <Theme themeKey="8" />
            </HStack>
            <HStack space={5} justifyContent="center">
                <Theme themeKey="9" />
                <Theme themeKey="10" />
            </HStack>
            <HStack space={5} justifyContent="center">
                <Theme themeKey="11" />
                <Theme themeKey="12" />
            </HStack>
        </VStack>
        </ScrollView>
    )
}

const Theme = (props: {themeKey: string}) => {
    const dispatch = useDispatch()

    return (
        <Pressable onPress={() => dispatch(setThemeKey(props.themeKey))}>
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <Box alignItems="left" style={{transform: [{scale: isPressed ? 0.96 : 1}]}}>
                        <Box
                            rounded="lg" 
                            overflow="hidden" 
                            borderColor="coolGray.200" 
                            borderWidth=".5" 
                        >
                            <Image width={160} height={250} source={themeSources[props.themeKey]} alt="image" />
                        </Box>
                    </Box>
                )
            }}
        </Pressable>
    )
}

interface CategoriesProps {
    navigateToFavorites: () => void;
    navigateToHome: () => void;
}
const Categories = (props: CategoriesProps) => {
    return (
        <HStack space={5} justifyContent="center">
            <Category categoryKey="General" onPress={props.navigateToHome} />
            <Category categoryKey="Favorites" onPress={props.navigateToFavorites} />
        </HStack>
    )
}
const Category = (props: {categoryKey: string, onPress: () => void}) => {
    return (
        <Pressable onPress={props.onPress}>
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <Box alignItems="left" style={{transform: [{scale: isPressed ? 0.96 : 1}]}}>
                        <Box
                            rounded="lg" 
                            overflow="hidden" 
                            borderColor="coolGray.200" 
                            borderWidth=".5" 
                        >
                            {props.categoryKey} Quotes
                        </Box>
                    </Box>
                )
            }}
        </Pressable>
    )
}



const styles = StyleSheet.create({
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 23,
        paddingHorizontal: 8,
        bottom: 0,
        backgroundColor: 'white',
    },
});
