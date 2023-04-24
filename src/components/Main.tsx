import { ImageBackground, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Box, Icon, IconButton, useToast, View } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useDownloadImage from '../hooks/useDownloadImage';
import useAudio from '../hooks/useAudio';

import Quote from './Quote';
import { themeSources } from '../constants/themes';
import { selectThemeKey } from '../store/slices/themeSlice';
import CustomToast from './CustomToast';

const MAIN_BUTTON_COLOR = "teal.500";
// https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/MaterialIcons.json

interface MainProps {
  openDrawer: () => void;
}
export default function Main(props: MainProps) {
  const toast = useToast();
  const themeKey = useSelector(selectThemeKey);
  const {isPlaying, playAudio, stopAudio} = useAudio();
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
              icon={<Icon color="white" name="favorite" as={MaterialIcons} size="lg" />} 
              onPress={downloadImage}
          />

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
              icon={<Icon color="white" name="share" as={Ionicons} size="lg" />} 
              onPress={shareToInstagram}
          />
        </Box>
        
        <Box style={[styles.mainButtons, styles.leftBox]}>
          <IconButton 
            m={'8px'} 
            borderRadius="full" 
            variant="solid" 
            p="3"
            bg={MAIN_BUTTON_COLOR}
            icon={<Icon color="white" name="menu" as={MaterialIcons} size="lg" />} 
            onPress={props.openDrawer}
          />
        </Box>

        <Box style={[styles.mainButtons, styles.rightBox]}>
          {isPlaying ? <IconButton 
            m={'8px'} 
            borderRadius="full" 
            variant="solid" 
            p="3"
            bg={MAIN_BUTTON_COLOR}
            icon={<Icon color="white" name="volume-mute-outline" as={Ionicons} size="lg" />}
            onPress={stopAudio}
          /> :
          <IconButton 
            m={'8px'} 
            borderRadius="full" 
            variant="solid" 
            p="3"
            bg={MAIN_BUTTON_COLOR}
            icon={<Icon color="white" name="volume-high-outline" as={Ionicons} size="lg" />} 
            onPress={playAudio}
          />}
        </Box>
      </View>   
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
    bottom: 190, 
    alignSelf: 'center'
  },
  mainButtons: {
    position: 'absolute', 
    bottom: 70, 
  },
  leftBox: {
    left: 30,
  },
  rightBox: {
    right: 30,
  }
});
