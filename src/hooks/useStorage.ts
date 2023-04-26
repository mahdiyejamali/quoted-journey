import AsyncStorage from '@react-native-async-storage/async-storage';

export const THEME = 'themeKey';
const APP_KEY = '@QuotedJourney';
export default function useStorage() {
    const getData = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(`${APP_KEY}_${key}`);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.error('getData', e);
        }      
    }

    const storeData = async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(`${APP_KEY}_${key}`, jsonValue);
        } catch (e) {
            console.error('storeData', e);
        }
    }

    const removeData = async (key: string) => {
        try {
            await AsyncStorage.removeItem(`${APP_KEY}_${key}`);
        } catch(e) {
            console.error('removeData', e);
        }
    }

    return { getData, storeData, removeData };
}