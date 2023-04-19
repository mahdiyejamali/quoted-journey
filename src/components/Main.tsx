import { Box, Icon, IconButton } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ImageBackground, StyleSheet } from 'react-native';
import NotificationHandler from './NotificationHandler';
import Quote from './Quote';
import SettingsDrawer from './SettingsDrawer';
import { themeSources } from '../constants/themes';
import { selectThemeKey } from '../store/slices/themeSlice';
import { useSelector } from 'react-redux';

export default function Main() {
  const themeKey = useSelector(selectThemeKey);

  return (
    <SettingsDrawer
      renderChildren={({openDrawer}) => (
          <ImageBackground source={themeSources[themeKey]} style={styles.backgroundImage}>
          <Quote />
          <NotificationHandler />
          <Box alignItems="left" style={styles.buttonsBox}>
            <IconButton 
              m={'8px'} 
              borderRadius="full" 
              variant="solid" 
              p="3"
              // bg="secondary" 
              icon={<Icon color="white" name="menu" as={MaterialIcons} size="lg" />} 
              onPress={openDrawer}
            />
          </Box>
        </ImageBackground>
      )}
    />      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  buttonsBox: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 40,
    marginLeft: 40,
    width: 100
  },
  button: {
    marginRight: 20,
  }
});
