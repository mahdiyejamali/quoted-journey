import { ImageBackground, StyleSheet } from 'react-native';
import Quote from './components/Quote';

export default function Main() {
  return (
      <ImageBackground source={require('../assets/bg-1.jpg')} style={styles.backgroundImage}>
        <Quote />
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
