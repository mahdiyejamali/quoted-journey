import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { getRandomQuote } from "../providers/quotable";
import AnimatedText from "./AnimatedText";

export default function Quote() {
    const [currentQuote, setCurrentQuote] = useState('');
    
    const fetchData = useCallback(async () => {
        const response = await getRandomQuote('life');
        const author = response?.author ? `\n\n--${response?.author}` : '';
        setCurrentQuote(`${response.content}${author}`)
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return (
        <Pressable onPress={fetchData}>
        <AnimatedText style={styles.text} text={currentQuote} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
      color: 'black',
      fontSize: 21,
      textAlign: 'center',
    //   fontFamily: 'body',
      fontWeight: 'bold',
    //   fontStyle: 'italic',
    },
});
