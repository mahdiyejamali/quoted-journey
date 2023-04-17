import { useEffect, useRef } from "react";
import { Animated, TextStyle } from "react-native";

interface AnimatedTextProps {
    text: string;
    style: TextStyle;
};

export default function AnimatedText(props: AnimatedTextProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        fadeIn();
    }, [props.text]);
  
    return (
        <Animated.Text
            style={[
                props.style,
                {
                    // Bind opacity to animated value
                    opacity: fadeAnim,
                }
            ]}
        >
            {props.text}
        </Animated.Text>
    );
  }
  