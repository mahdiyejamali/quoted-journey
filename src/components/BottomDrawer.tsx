import { View,StyleSheet, Dimensions } from 'react-native';
import { Box, Button, Heading, HStack, Image, Pressable, ScrollView, Switch, Text, VStack } from 'native-base';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modalbox'
import RNDateTimePicker from '@react-native-community/datetimepicker';

import { MAIN_BG_COLOR, themeSources } from '../constants/themes';
import { setThemeKey } from '../store/slices/themeSlice';
import useFavorite from '../hooks/useFavorite';
import { QuoteGenre } from '../providers/quotable';
import { setQuoteGenre } from '../store/slices/quoteSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNotificationQuote, selectNotificationStatus, selectNotificationTime, setNotificationQuote, setNotificationStatus, setNotificationTime } from '../store/slices/notificationSlice';
import useNotification from '../hooks/useNotification';

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
                <Box style={{position: 'absolute', left: 0, top: 0, margin: 5}}>
                    <Button variant='unstyled' onPress={handleClose}>
                        <Text style={{fontWeight: 'bold'}}>Cancel</Text>
                    </Button>
                </Box>

                <ScrollView style={{marginTop: 25, paddingHorizontal: 5}}>
                    <Heading style={{marginVertical: 15}} size='md'>Notifications</Heading>
                    <NotificationSettings />

                    <Heading style={{marginVertical: 15}} size='md'>Categories</Heading>
                    <Categories {...categoriesProps} />

                    <Heading style={{marginVertical: 15}} size='md'>Themes</Heading>
                    <Themes />
                </ScrollView>
            </View>
        </Modal>
    )
}

const NotificationSettings = () => {
    const dispatch = useDispatch();
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

    const notificationStatus = useSelector(selectNotificationStatus);
    const notificationTime = useSelector(selectNotificationTime);
    const notificationQuote = useSelector(selectNotificationQuote);

    const {schedulePushNotification} = useNotification({
        setQuote: (quote: string) => dispatch(setNotificationQuote(quote)),
        notificationStatus,
        notificationTime,
    });

    const onStatusToggle = (toggleValue: boolean) => {
        dispatch(setNotificationStatus(toggleValue));

        schedulePushNotification(toggleValue, notificationTime)
    }

    const onTimeChange = (timestamp: number | undefined, type: string) => {
        // type => "dismissed" | "set"
        setIsTimePickerOpen(false);

        if (type == "set") {
            dispatch(setNotificationTime(timestamp));

            schedulePushNotification(notificationStatus, timestamp)
        }
    }

    return (
        <HStack>
            <HStack space={5}>
                <Box
                    rounded="lg" 
                    width={160}
                    height={50}
                    style={{alignItems: 'flex-start'}}
                >
                    <Switch size="md" isChecked={notificationStatus} onToggle={onStatusToggle} />
                </Box>

                <Box
                    rounded="lg" 
                    width={160}
                    height={50}
                >
                    <Button
                        width="100%" 
                        backgroundColor={!notificationStatus ? 'gray.200': MAIN_BG_COLOR}
                        onPress={() => !!notificationStatus && setIsTimePickerOpen(true)}
                    >
                        <Text style={{fontWeight: 'bold'}}>Set Time</Text>
                    </Button>

                    {isTimePickerOpen && 
                        <RNDateTimePicker
                            onChange={(dateTime) => onTimeChange(dateTime.nativeEvent.timestamp, dateTime.type.toString())}
                            value={notificationTime ? new Date(notificationTime): new Date()}
                            mode="time"
                        />
                    }
                </Box>
            </HStack>
        </HStack>
    )
}

const Themes = () => {
    return (
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
                    <Box style={{transform: [{scale: isPressed ? 0.96 : 1}]}}>
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
    const dispatch = useDispatch();
    const notificationQuote = useSelector(selectNotificationQuote);

    const onCategoryPress = (genre: QuoteGenre) => {
        if (notificationQuote) {
            // Clear notificationQuote when category changes
            dispatch(setNotificationQuote(undefined));
        }
        // Set quote genre
        dispatch(setQuoteGenre(genre));
        props.navigateToHome();
    }

    return (
        <VStack space={3}>
            <HStack space={5} justifyContent="center">
                <Category categoryTitle="General" onPress={() => onCategoryPress("life")} />
                <Category categoryTitle="Motivational" onPress={() => onCategoryPress("motivational")} />
            </HStack>
            <HStack space={5} justifyContent="center">
                <Category categoryTitle="Inspirational" onPress={() => onCategoryPress("inspirational")} />
                <Category categoryTitle="Peace" onPress={() => onCategoryPress("peace")} />
            </HStack>
            <HStack space={5} justifyContent="center">
                <Category categoryTitle="Affirmations" onPress={() => onCategoryPress("affirmations")} />
                <Category
                    categoryTitle="Favorites" 
                    onPress={props.navigateToFavorites} 
                    disabled={!hasFavorites()} 
                    // backgroundColor={'rose.500'} 
                />
            </HStack>
        </VStack>
    )
}

interface CategoryProps {
    categoryTitle: string;
    onPress: () => void;
    disabled?: boolean
    backgroundColor?: string;
}
const Category = (props: CategoryProps) => {
    const {disabled} = props;
    const backgroundColor = props.backgroundColor || MAIN_BG_COLOR;
    return (
        <Pressable onPress={props.onPress} disabled={disabled}>
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <Box style={{transform: [{scale: isPressed ? 0.96 : 1}]}}>
                        <Box
                            rounded="lg" 
                            overflow="hidden" 
                            borderColor={disabled ? 'gray.200': backgroundColor}
                            borderWidth="1.5" 
                            width={160}
                            height={70}
                            style={styles.categoryBox}
                            // backgroundColor={disabled ? 'gray.200': backgroundColor}
                        >
                            <Text style={{fontWeight: 'bold'}}>{props.categoryTitle}</Text>
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
