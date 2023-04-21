import { Box, Icon, IconButton, useToast, View } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImageBackground, StyleSheet } from 'react-native';
import NotificationHandler from './NotificationHandler';
import Quote from './Quote';
import SettingsDrawer from './SettingsDrawer';
import { themeSources } from '../constants/themes';
import { selectThemeKey } from '../store/slices/themeSlice';
import { useSelector } from 'react-redux';
import useDownloadImage from '../hooks/useDownloadImage';
import CustomToast from './CustomToast';

const MAIN_BUTTON_COLOR = "teal.500";
// https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/MaterialIcons.json
export default function Main() {
  const toast = useToast();

  const themeKey = useSelector(selectThemeKey);
  const {viewRef, downloadImage, shareToInstagram} = useDownloadImage<ImageBackground>({
    onSuccess: () => {
      toast.show({
        render: () => <CustomToast status='success' title='Successfully saved!' />
      });
    },
    onError: () => {
      toast.show({
        render: () => <CustomToast status='error' title='Something went wrong.' />
      });
    }
  });

  return (
    <SettingsDrawer
      renderChildren={({openDrawer}) => (
        <View style={styles.container}>
          <ImageBackground ref={viewRef} source={themeSources[themeKey]} style={styles.backgroundImage}>
            <Quote />
          </ImageBackground>
          
          <Box style={styles.actionsBox}>
            <IconButton 
                m={'8px'} 
                borderRadius="full" 
                variant="outline" 
                p="3"
                // bg="secondary" 
                borderColor={MAIN_BUTTON_COLOR}
                icon={<Icon color="white" name="file-download" as={MaterialIcons} size="lg" />} 
                onPress={downloadImage}
            />

            <IconButton 
                m={'8px'} 
                borderRadius="full" 
                variant="outline" 
                p="3"
                // bg="secondary"
                borderColor={MAIN_BUTTON_COLOR}
                icon={<Icon color="white" name="logo-instagram" as={Ionicons} size="lg" />} 
                onPress={shareToInstagram}
            />
          </Box>
          
          <Box style={styles.mainButtonsBox}>
            <IconButton 
              m={'8px'} 
              borderRadius="full" 
              variant="solid" 
              p="3"
              bg={MAIN_BUTTON_COLOR}
              icon={<Icon color="white" name="menu" as={MaterialIcons} size="lg" />} 
              onPress={openDrawer}
            />
          </Box>

          <NotificationHandler />
        </View>
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
  actionsBox: {
    flexDirection: 'row',
    position: 'absolute', 
    bottom: 200, 
    alignSelf: 'center'
  },
  mainButtonsBox: {
    position: 'absolute', 
    bottom: 100, 
    left: 20,
  },
  button: {
    marginRight: 20,
  }
});
