import { Box } from "native-base";

export interface CustomToastProps {
    status: Status;
    title: string;
}
type Status = 'success' | 'error' | 'info' | 'warning';
const BG_COLORS: {[key in Status]: string} = {
    'success': 'success.200',
    'error': 'error.400',
    'info': 'info.200',
    'warning': 'warning.200',
}

export default function CustomToast(props: CustomToastProps) {
    const {status, title} = props;
    
    return (
        <Box bg={BG_COLORS[status]} px="5" py="3" rounded="sm" mb={5}>
            {title}
        </Box>
    );
}