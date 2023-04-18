import { useRef } from "react";
import { Animated } from "react-native";

export default function useFade(fadeInDuration = 2000, fadeOutDuration = 2000) {
  const fadeRef = useRef(new Animated.Value(0)).current;
  
  const fadeIn = () => {
      Animated.timing(fadeRef, {
        toValue: 1,
        duration: fadeInDuration,
        useNativeDriver: true,
      }).start();
  };

  const fadeOut = () => {
      Animated.timing(fadeRef, {
        toValue: 0,
        duration: fadeOutDuration,
        useNativeDriver: true,
      }).start();
  };

  return {fadeStyle: { opacity: fadeRef }, fadeIn, fadeOut};
}