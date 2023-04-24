import { Box, Heading, HStack, Image, Pressable, ScrollView, VStack } from 'native-base';
import { useDispatch } from 'react-redux';
import { themeSources } from '../constants/themes';
import { setThemeKey } from '../store/slices/themeSlice';

export default function SettingDrawerContent() {
    return (
        <>
            <Heading style={{margin: 15}}>Categories</Heading>
            <Categories />

            <Heading style={{margin: 15}}>Themes</Heading>
            <Themes />
        </>
    )
}

const Themes = () => {
    return (
        <ScrollView>
        <VStack space={3}>
            <HStack space={5} justifyContent="center">
                <Theme themeKey="1" />
                <Theme themeKey="2" />
            </HStack>
            <HStack space={5} justifyContent="center">
                <Theme themeKey="3" />
                <Theme themeKey="4" />
            </HStack>
            <HStack space={5} justifyContent="center">
                <Theme themeKey="5" />
                <Theme themeKey="6" />
            </HStack>
            <HStack space={5} justifyContent="center">
                <Theme themeKey="7" />
                <Theme themeKey="8" />
            </HStack>
            <HStack space={5} justifyContent="center">
                <Theme themeKey="9" />
                <Theme themeKey="10" />
            </HStack>
            <HStack space={5} justifyContent="center">
                <Theme themeKey="11" />
                <Theme themeKey="12" />
            </HStack>
        </VStack>
        </ScrollView>
    )
}

const Theme = (props: {themeKey: string}) => {
    const dispatch = useDispatch()

    return (
        <Pressable onPress={() => dispatch(setThemeKey(props.themeKey))}>
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <Box alignItems="left" style={{transform: [{scale: isPressed ? 0.96 : 1}]}}>
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

const Categories = () => {
    return (
        <HStack space={5} justifyContent="center">
            <Category categoryKey="General" />
            <Category categoryKey="Favorites" />
        </HStack>
    )
}
const Category = (props: {categoryKey: string}) => {
    return (
        <Pressable onPress={() => {}}>
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <Box alignItems="left" style={{transform: [{scale: isPressed ? 0.96 : 1}]}}>
                        <Box
                            rounded="lg" 
                            overflow="hidden" 
                            borderColor="coolGray.200" 
                            borderWidth=".5" 
                        >
                            {props.categoryKey} Quotes
                        </Box>
                    </Box>
                )
            }}
        </Pressable>
    )
}

