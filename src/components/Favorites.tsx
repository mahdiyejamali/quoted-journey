import GestureRecognizer from 'react-native-swipe-gestures';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
import MainWrapper, { MainWrapperProps } from './MainWrapper';
import { useEffect, useState } from 'react';
import useFavorite from '../hooks/useFavorite';

interface FavoritesProps extends Pick<MainWrapperProps, 'openDrawer'> {}
export default function Favorites(props: FavoritesProps) {
  const {savedFavorites, getFavoriteDatafromKey, removeAllFavorites, hasFavorites} = useFavorite();

  const [currentIndex, setCurrentIndex] = useState(0);

  const favoriteDatafromKey = hasFavorites() ? 
    getFavoriteDatafromKey(savedFavorites[currentIndex]) :
    {themeKey: '', quoteText: ''};

  useEffect(() => {
    // removeAllFavorites()
  }, [])

  const goToNext = () => {
    setCurrentIndex(currentIndex == savedFavorites.length - 1 ? currentIndex : currentIndex + 1);
  }

  const goToPrev = () => {
    setCurrentIndex(currentIndex == 0 ? currentIndex : currentIndex - 1);
  }

  return (
    <MainWrapper {...props} themeKey={favoriteDatafromKey.themeKey} quoteText={favoriteDatafromKey.quoteText}>
      <GestureRecognizer
          style={styles.pressableBackground}
          onSwipeDown={goToNext}
          onSwipeUp={goToPrev}
      >
          <Text style={styles.text}>{favoriteDatafromKey.quoteText}</Text>
      </GestureRecognizer>
    </MainWrapper>
    
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
