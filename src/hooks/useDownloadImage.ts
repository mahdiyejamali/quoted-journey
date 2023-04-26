import { ReactNode, useRef } from "react";
import {Platform} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {captureRef} from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useToast } from "native-base";

interface UseDownloadProps {
    renderSuccessToast: () => ReactNode;
    renderFailureToast: () => ReactNode;
}
export default function useDownloadImage<T>(props: UseDownloadProps) {
    const viewRef = useRef<T | null>(null);
    const toast = useToast();

    const onSuccess = () => {
        toast.show({
            render: props.renderSuccessToast
        })
    };

    const onError = () => {
        toast.show({
            render: props.renderFailureToast
        })
    }

    const getPermission = async () => {
        try {
            return MediaLibrary.requestPermissionsAsync();
        } catch (err) {
            console.error('getPermission', err);
            onError();
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
                onSuccess();
            } else {
                onError();
            }
        } catch (e) {
            console.error('downloadImage', e);
            onError();
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
            console.error('shareToInstagram', e);
            onError();
        }
    }
    
    return {viewRef, downloadImage, shareToInstagram};
}
