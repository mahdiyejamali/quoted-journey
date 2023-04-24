import { useCallback, useEffect } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useFade from "../hooks/useFade";
import { getRandomQuote } from "../providers/quotable";
import { selectQuoteText, setQuoteText } from "../store/slices/quoteSlice";

export default function Quote() {
    const {fadeStyle, fadeIn, fadeOut} = useFade();

    const dispatch = useDispatch();
    const saveCurrentQuoteText = (quote: string) => dispatch(setQuoteText(quote));
    const currentQuoteText = useSelector(selectQuoteText);

    const fetchData = useCallback(async () => {
        const response = await getRandomQuote('life');
        const author = response?.author ? `\n\n--${response?.author}` : '';
        const quote = `${response.content}${author}`;
        saveCurrentQuoteText(quote);
    }, []);

    useEffect(() => {
        fadeIn();
    }, [currentQuoteText]);

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
                {currentQuoteText}
            </Animated.Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'BalsamiqSans_700Bold',
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
