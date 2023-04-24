import { useRef } from "react";
import {Platform} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {captureRef} from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

interface UseDownloadProps {
    onSuccess: () => void;
    onError: () => void
}
export default function useDownloadImage<T>(props: UseDownloadProps) {
    const viewRef = useRef<T | null>(null);

    const getPermission = async () => {
        try {
            return MediaLibrary.requestPermissionsAsync();
        } catch (err) {
            console.log('getPermission', err);
            props.onError();
        }
    };

    const downloadImage = async () => {
        try {
            // Caputures component
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 1,
            });
    
            if (Platform.OS === 'android' || Platform.OS === 'ios') {
                const granted = await getPermission();
                if (!granted) {
                    return;
                }
            }
    
            const image = await MediaLibrary.createAssetAsync(uri);
            if (image) {
                props.onSuccess();
            } else {
                props.onError();
            }
        } catch (e) {
            console.log('downloadImage', e);
            props.onError();
        }
    };

    const shareToInstagram = async () => {        
        // Capture component 
        const url = await captureRef(viewRef, {
            format: 'jpg',
            quality: 1,
        });

        try {
            Sharing.shareAsync("file://" + url)
        } catch (e) {
            console.log('shareToInstagram', e);
            props.onError();
        }
    }
    
    return {viewRef, downloadImage, shareToInstagram};
}
