import { extendTheme, NativeBaseProvider } from 'native-base';
import Main from './src/Main';

const theme = extendTheme({});

export default function App() {
    return (
        <NativeBaseProvider theme={theme}>
            <Main />
        </NativeBaseProvider>
    )
};