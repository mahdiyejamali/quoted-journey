import AsyncStorage from '@react-native-async-storage/async-storage';

export const THEME = 'themeKey';
const APP_KEY = '@QuotedJourney';
export default function useStorage() {
    const getData = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(`${APP_KEY}_${key}`);
            console.log('getData???????????????????', jsonValue != null ? JSON.parse(jsonValue) : null)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log('getData', e);
        }      
    }

    const storeData = async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            console.log('storeData???????????????????', value, jsonValue)
            await AsyncStorage.setItem(`${APP_KEY}_${key}`, jsonValue);
        } catch (e) {
            console.log('storeData', e);
        }
    }

    const removeData = async (key: string) => {
        try {
            await AsyncStorage.removeItem(`${APP_KEY}_${key}`);
        } catch(e) {
            console.log('removeData', e);
        }
    }

    return { getData, storeData, removeData };
}