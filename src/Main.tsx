import { ImageBackground, StyleSheet } from 'react-native';
import NotificationHandler from './components/NotificationHandler';
import Quote from './components/Quote';

export default function Main() {
  return (
      <ImageBackground source={require('../assets/bg-6.jpg')} style={styles.backgroundImage}>
        <Quote />
        <NotificationHandler />
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
});
