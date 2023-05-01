import MainWrapper, { MainWrapperProps } from './MainWrapper';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getQuotesList, QuoteGenre } from '../providers/quotable';
import { selectQuoteGenre, setQuoteText } from '../store/slices/quoteSlice';

interface MainProps extends Pick<MainWrapperProps, 'openDrawer'> {}
export default function Main(props: MainProps) {
  const [quotesList, setQuotesList] = useState<string[]>([]);
  const dispatch = useDispatch();
  const quoteGenre = useSelector(selectQuoteGenre);

  const fetchData = useCallback(async (quoteGenre: QuoteGenre) => {
      try {
        const response = await getQuotesList(quoteGenre);
        setQuotesList(response);
        dispatch(setQuoteText(response[0]));
      } catch (e) {
        console.error('fetchData', e)
      }
  }, []);

  useEffect(() => {
      fetchData(quoteGenre);
  }, [quoteGenre]);

  return (
    <MainWrapper {...props} category={"main"} quotesList={quotesList} />
  );
}
