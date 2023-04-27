import { ReactNode, useCallback, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { extendTheme, NativeBaseProvider, View } from 'native-base';
import { persistStore } from "redux-persist"
import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from "expo-splash-screen";

import Main from './src/components/Main';
import store from './src/store/store';
import useNotification from './src/hooks/useNotification';
import Favorites from './src/components/Favorites';
import BottomDrawer from './src/components/BottomDrawer';

const Stack = createNativeStackNavigator();
interface ScreenWrapperChildrenProps {
    openDrawer: () => void;
}
interface ScreenWrapperProps {
    navigation: {navigate: (name: string) => void};
    children: (props: ScreenWrapperChildrenProps) => ReactNode
}
const ScreenWrapper = (props: ScreenWrapperProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <View style={{flex: 1}}>
            <BottomDrawer
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                navigateToFavorites={() => {
                    props.navigation.navigate('Favorites');
                    setIsOpen(false);
                }}
                navigateToHome={() => {
                    props.navigation.navigate('Home');
                    setIsOpen(false);
                }}
            />
            {props.children({openDrawer: () => setIsOpen(true)})}
        </View>
    )
}
const WrappedHome = (navigationProps: {navigation: any}) => (
    <ScreenWrapper {...navigationProps}>{(props) => <Main openDrawer={props.openDrawer} />}</ScreenWrapper>
)
const WrappedFavorites = (navigationProps: {navigation: any}) => (
    <ScreenWrapper {...navigationProps}>{(props) => <Favorites openDrawer={props.openDrawer} />}</ScreenWrapper>
)
const NavigationWrapper = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={WrappedHome} />
                <Stack.Screen name="Favorites" component={WrappedFavorites} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const theme = extendTheme({
});

const persistor = persistStore(store);
SplashScreen.preventAutoHideAsync();

export default function App() {
    const {} = useNotification();
    const [fontsLoaded] = useFonts({
        'Caveat-Bold': require('./assets/fonts/Caveat-Bold.ttf'),
        'Caveat-Medium': require('./assets/fonts/Caveat-Medium.ttf'),
        'Caveat-Regular': require('./assets/fonts/Caveat-Regular.ttf'),
        'Caveat-SemiBold': require('./assets/fonts/Caveat-SemiBold.ttf'),
        'IndieFlower-Regular': require('./assets/fonts/IndieFlower-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Satisfy-Regular': require('./assets/fonts/Satisfy-Regular.ttf'),
        'Signika-VariableFont_wght': require('./assets/fonts/Signika-VariableFont_wght.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NativeBaseProvider theme={theme}>
                    <View style={{flex: 1}} onLayout={onLayoutRootView}>
                        <NavigationWrapper />
                    </View>
                </NativeBaseProvider>
            </PersistGate>
        </Provider>
    )
};
