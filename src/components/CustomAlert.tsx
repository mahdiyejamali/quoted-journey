import { Alert, CloseIcon, HStack, IconButton, Text, VStack } from "native-base";

export interface CustomAlertProps {
    isOpen: boolean;
    status: AlertStatus;
    title?: string;
    onClose?: () => void;
}
type AlertStatus = 'success' | 'error' | 'info' | 'warning';
const ALERT_TITLES: {[key in AlertStatus]: string} = {
    'success': 'Successfully saved!',
    'error': 'Please try again later!',
    'info': '',
    'warning': '',
}

export default function CustomAlert(props: CustomAlertProps) {
    const {isOpen, status, title, onClose} = props;
    return isOpen ? (
        <Alert w="80%" status={status} variant="subtle" style={{position: 'absolute', bottom: '10%'}} alignSelf='center'>
            <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                        {title || ALERT_TITLES[status]}
                    </Text>
                    </HStack>
                {onClose && <IconButton 
                    onPress={onClose}
                    variant="unstyled" 
                    _focus={{borderWidth: 0}} 
                    icon={<CloseIcon size="3" />} _icon={{color: "coolGray.600"}} 
                />}
            </HStack>
            </VStack>
        </Alert>
    ): null;
}