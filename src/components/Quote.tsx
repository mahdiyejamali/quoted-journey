import { useCallback, useEffect, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import useFade from "../hooks/useFade";
import { getRandomQuote } from "../providers/quotable";

export default function Quote() {
    const [currentQuote, setCurrentQuote] = useState('');
    const {fadeStyle, fadeIn, fadeOut} = useFade();

    const fetchData = useCallback(async () => {
        const response = await getRandomQuote('life');
        const author = response?.author ? `\n\n--${response?.author}` : '';
        setCurrentQuote(`${response.content}${author}`)
    }, []);

    useEffect(() => {
        fadeIn();
    }, [currentQuote]);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    const handlePress = () => {
        fadeOut();
        setTimeout(() => {
            fetchData();
        }, 1000);
    }

    return (
        <Pressable onPress={handlePress} style={styles.pressableBackground}>
            <Animated.Text style={[styles.text, fadeStyle]}>
                {currentQuote}
            </Animated.Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 21,
        textAlign: 'center',
        fontFamily: 'Noteworthy',
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
    },
    pressableBackground: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
});
