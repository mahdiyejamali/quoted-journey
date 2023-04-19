import { Box, HStack, Image, Pressable, ScrollView, VStack } from 'native-base';
import { ReactNode, useRef } from 'react';
import Drawer from 'react-native-drawer';
import { useDispatch } from 'react-redux';
import { themeSources } from '../constants/themes';
import useStorage, { THEME } from '../hooks/useStorage';
import { setThemeKey } from '../store/slices/themeSlice';

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 3},
    main: {},
}
interface SettingsDrawerProps {
    renderChildren: (props: {openDrawer: () => void}) => ReactNode;
}
export default function SettingsDrawer(props: SettingsDrawerProps) {
    const drawerRef = useRef<Drawer>(null);

    const openDrawer = () => drawerRef?.current?.open?.();
    const closeDrawer = () => drawerRef?.current?.close?.()
    return (
        <Drawer
            ref={drawerRef}
            side="bottom"
            type="overlay"
            content={<SettingDrawerContent />}
            tapToClose={true}
            openDrawerOffset={0.1} // 10% gap on the top side of drawer
            // closedDrawerOffset={-3}
            panCloseMask={0.2}
            styles={drawerStyles}
            tweenHandler={(ratio) => ({
                main: { opacity: (2-ratio)/2 }
            })}
        >
            {props.renderChildren({openDrawer})}
        </Drawer>
    );
}

const SettingDrawerContent = () => {
    return (
        <ScrollView h="full">
            <Themes />
        </ScrollView>
    )
}

const Themes = () => {
    return (
        <VStack space={3}>
            <HStack space={3} justifyContent="center">
                <Theme themeKey="1" />
                <Theme themeKey="2" />
            </HStack>
            <HStack space={3} justifyContent="center">
                <Theme themeKey="3" />
                <Theme themeKey="4" />
            </HStack>
            <HStack space={3} justifyContent="center">
                <Theme themeKey="5" />
                <Theme themeKey="6" />
            </HStack>
            <HStack space={3} justifyContent="center">
                <Theme themeKey="7" />
                <Theme themeKey="8" />
            </HStack>
            <HStack space={3} justifyContent="center">
                <Theme themeKey="9" />
                <Theme themeKey="10" />
            </HStack>
            <HStack space={3} justifyContent="center">
                <Theme themeKey="10" />
                <Theme themeKey="11" />
            </HStack>
        </VStack>
    )
}

const Theme = (props: {themeKey: string}) => {
    const dispatch = useDispatch()
    // const {storeData} = useStorage();

    return (
        <Pressable onPress={() => dispatch(setThemeKey(props.themeKey))}>
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <Box alignItems="left" marginLeft="3" style={{transform: [{scale: isPressed ? 0.96 : 1}]}}>
                        <Box
                            rounded="lg" 
                            overflow="hidden" 
                            borderColor="coolGray.200" 
                            borderWidth=".5" 
                        >
                            <Image width={160} height={250} source={themeSources[props.themeKey]} alt="image" />
                        </Box>
                    </Box>
                )
            }}
        </Pressable>
    )
}
