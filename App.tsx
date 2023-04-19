import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { extendTheme, NativeBaseProvider } from 'native-base';
import Main from './src/components/Main';
import { persistStore } from "redux-persist"

import store from './src/store/store';

const theme = extendTheme({});
const persistor = persistStore(store);

export default function App() {
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