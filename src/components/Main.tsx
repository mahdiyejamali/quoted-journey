import Quote from './Quote';
import MainWrapper, { MainWrapperProps } from './MainWrapper';
import { selectThemeKey } from '../store/slices/themeSlice';
import { useSelector } from 'react-redux';
import { selectQuoteText } from '../store/slices/quoteSlice';

interface MainProps extends Pick<MainWrapperProps, 'openDrawer'> {}
export default function Main(props: MainProps) {
  const themeKey = useSelector(selectThemeKey);
  const quoteText = useSelector(selectQuoteText);

  return (
    <MainWrapper {...props} themeKey={themeKey} quoteText={quoteText}>
      <Quote />
    </MainWrapper> 
  );
}
