import { Text, View } from 'native-base';
import { ImageBackground, StyleSheet } from 'react-native';

interface FavoritesProps {
  openDrawer: () => void;
}
export default function Favorites(props: FavoritesProps) {
  return (
    <View>
      <Text>Favotites</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
