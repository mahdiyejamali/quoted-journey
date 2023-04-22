import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

export default function useAudio() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(new Audio.Sound());

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            } : undefined;
    }, [sound]);
    

    async function playAudio() {
        const backgroundSound = require('../../assets/bg-music-1.mp3');
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true});

        try {
            const { sound } = await Audio.Sound.createAsync(backgroundSound);;
            await sound.setIsLoopingAsync(true)
            setSound(sound);
            setIsPlaying(true);

            await sound.playAsync();
        } catch (e) {
            console.error('playAudio', e)
        }
    }

    const stopAudio = async () => {
        setIsPlaying(false);
        // await sound?.stopAsync();
        setSound(null);
    }

    return {isPlaying, playAudio, stopAudio};
}