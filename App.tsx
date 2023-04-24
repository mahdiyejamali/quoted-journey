import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { extendTheme, NativeBaseProvider, View } from 'native-base';
import Main from './src/components/Main';
import { persistStore } from "redux-persist"
import {
    useFonts,
    BalsamiqSans_400Regular,
    BalsamiqSans_400Regular_Italic,
    BalsamiqSans_700Bold,
    BalsamiqSans_700Bold_Italic,
} from "@expo-google-fonts/balsamiq-sans";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store from './src/store/store';
import useNotification from './src/hooks/useNotification';
import Favorites from './src/components/Favorites';
import BottomDrawer from './src/components/BottomDrawer';
import { ReactNode, useState } from 'react';

const theme = extendTheme({
});

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

const persistor = persistStore(store);
export default function App() {
    const {} = useNotification();
    let [fontsLoaded] = useFonts({
        BalsamiqSans_400Regular,
        BalsamiqSans_400Regular_Italic,
        BalsamiqSans_700Bold,
        BalsamiqSans_700Bold_Italic,
    });

    if (!fontsLoaded) {
        return <></>;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NativeBaseProvider theme={theme}>
                    <NavigationWrapper />
                </NativeBaseProvider>
            </PersistGate>
        </Provider>
    )
};