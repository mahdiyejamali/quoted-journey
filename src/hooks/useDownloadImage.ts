import { useRef } from "react";
import {Linking, Platform} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {captureRef} from 'react-native-view-shot';

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
                quality: 0.8,
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
        try {
            // Capture component 
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 0.8,
            });
            const encodedUrl = encodeURIComponent(uri);
            const instagramUrl = `instagram://library?AssetPath=${encodedUrl}`;
            Linking.openURL(instagramUrl);
        } catch (e) {
            console.log('shareImage', e);
            props.onError();
        }
    };

    return {viewRef, downloadImage, shareToInstagram};
}
