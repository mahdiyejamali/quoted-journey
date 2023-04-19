import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-notifications';

const PROJEC_ID = '460023b5-84f9-4118-9575-78427c65c0a5';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationHandler() {
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
        console.log(response);
    });

    return () => {
        notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
        responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    schedulePushNotification();
  }, []);

  return (
    null
  );
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
        },
        trigger: {
            hour: 11,
            minute: 0,
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

  if (Device.isDevice) {
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
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}