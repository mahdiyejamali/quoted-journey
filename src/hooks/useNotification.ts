
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

interface UseNotificationProps {
    setQuote: (quote: string) => void;
    notificationStatus: boolean;
    notificationTime?: number;
}
export default function useNotification(props: UseNotificationProps) {
    const [expoPushToken, setExpoPushToken] = useState<string|undefined>('');
    const [notification, setNotification] = useState<Notifications.Notification | null>(null);
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        return () => {
            notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function schedulePushNotification(status: boolean, timestamp?: number) {
        const quote = getRandomAffirmation();
    
        await Notifications.cancelAllScheduledNotificationsAsync();
    
        const selectedDate = timestamp ? new Date(timestamp) : undefined;
        const hour = selectedDate ? selectedDate.getHours(): 9;
        const minute = selectedDate ? selectedDate.getMinutes(): 0;
    
        if (status) {
            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });
    
            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                props.setQuote(response.notification?.request?.content?.data?.quote);
            });

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Mindful Moments',
                    body: quote.quoteText,
                    data: { quote: quote.quoteText },
                },
                trigger: {
                    hour,
                    minute,
                    repeats: true,
                },
            });
        }
    
        const notifs = (await Notifications.getAllScheduledNotificationsAsync()).length;
        console.log({hour, minute, notifs});
    }

    return {schedulePushNotification};
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