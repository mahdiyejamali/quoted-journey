import MainWrapper, { MainWrapperProps } from './MainWrapper';
import { selectThemeKey } from '../store/slices/themeSlice';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getQuotesList } from '../providers/quotable';
import { setQuoteText } from '../store/slices/quoteSlice';

interface MainProps extends Pick<MainWrapperProps, 'openDrawer'> {}
export default function Main(props: MainProps) {
  const [quotesList, setQuotesList] = useState<string[]>([]);
    const dispatch = useDispatch();
    const fetchData = useCallback(async () => {
        const response = await getQuotesList();
        setQuotesList(response);
        dispatch(setQuoteText(response[0]))
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <MainWrapper {...props} category={"main"} quotesList={quotesList} />
  );
}
