import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { extendTheme, NativeBaseProvider } from 'native-base';
import Main from './src/components/Main';
import { persistStore } from "redux-persist"
import {
    useFonts,
    BalsamiqSans_400Regular,
    BalsamiqSans_400Regular_Italic,
    BalsamiqSans_700Bold,
    BalsamiqSans_700Bold_Italic,
} from "@expo-google-fonts/balsamiq-sans";

import store from './src/store/store';
import useNotification from './src/hooks/useNotification';

const theme = extendTheme({
});

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
                    <Main />
                </NativeBaseProvider>
            </PersistGate>
        </Provider>
    )
};