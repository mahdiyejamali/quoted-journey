
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-notifications';
import { getRandomAffirmation } from '../providers/quotable';

const PROJEC_ID = '460023b5-84f9-4118-9575-78427c65c0a5';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
export default function useNotification() {
    const [expoPushToken, setExpoPushToken] = useState<string|undefined>('');
    const [notification, setNotification] = useState<Notifications.Notification | null>(null);
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('data', response.notification?.request?.content?.data);
        });

        return () => {
            notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        schedulePushNotification();
    }, []);

    return {};
}

async function schedulePushNotification() {
    const quote = getRandomAffirmation();

    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Mindful Moments',
            body: quote.quoteText,
            data: { quote },
        },
        trigger: {
            hour: 19,
            minute: 48,
            repeats: true,
        },
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    // if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({projectId: PROJEC_ID})).data;
    // }

    return token;
}