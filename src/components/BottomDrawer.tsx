import { View,StyleSheet, Dimensions } from 'react-native';
import { Box, Button, Heading, HStack, Image, Pressable, ScrollView, Text, VStack } from 'native-base';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modalbox'

import { themeSources } from '../constants/themes';
import { setThemeKey } from '../store/slices/themeSlice';
import useFavorite from '../hooks/useFavorite';

interface BottomDrawer extends CategoriesProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

const MODAL_HEIGHT = Dimensions.get('window').height * 0.85;
export default function BottomDrawer(props: BottomDrawer) {
    const {isOpen, setIsOpen, ...categoriesProps} = props;

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Modal
            backdrop={true}
            backdropPressToClose
            swipeToClose
            position="bottom"
            isOpen={isOpen}
            onOpened={handleOpen}
            onClosed={handleClose}
            style={styles.modal}
        >
            <View style={[styles.bottomDrawer]}>
                <Box style={{position: 'absolute',left: 0, top: 0, margin: 5}}>
                    <Button variant='unstyled' onPress={handleClose}>
                        <Text style={{fontWeight: 'bold'}}>Cancel</Text>
                    </Button>
                </Box>

                <Heading style={{margin: 15}} size='md'>Categories</Heading>
                <Categories {...categoriesProps} />

                <Heading style={{margin: 15}} size='md'>Themes</Heading>
                <Themes />
            </View>
        </Modal>
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
                            <Image width={160} height={200} source={themeSources[props.themeKey]} alt="image" />
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
    const {hasFavorites} = useFavorite();
    return (
        <HStack space={5} justifyContent="center">
            <Category categoryKey="General" onPress={props.navigateToHome} />
            <Category categoryKey="Favorites" onPress={props.navigateToFavorites} disabled={!hasFavorites()} backgroundColor={'rose.300'} />
        </HStack>
    )
}

interface CategoryProps {
    categoryKey: string;
    onPress: () => void;
    disabled?: boolean
    backgroundColor?: string;
}
const Category = (props: CategoryProps) => {
    const {disabled} = props;
    const backgroundColor = props.backgroundColor || 'teal.200';
    return (
        <Pressable onPress={props.onPress} disabled={disabled}>
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
                            width={160}
                            height={70}
                            style={styles.categoryBox}
                            backgroundColor={disabled ? 'gray.200': backgroundColor}
                        >
                            <Text style={{fontWeight: 'bold'}}>{props.categoryKey}</Text>
                        </Box>
                    </Box>
                )
            }}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    modal: {
        height: MODAL_HEIGHT,
        justifyContent:'center',
        borderRadius: 10,
    },
    bottomDrawer: {
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
        height: MODAL_HEIGHT,
    },
    categoryBox: {
        alignItems: 'center',
        paddingVertical: 24
    }
});
