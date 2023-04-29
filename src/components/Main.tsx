import MainWrapper, { MainWrapperProps } from './MainWrapper';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getQuotesList } from '../providers/quotable';
import { selectQuoteGenre, setQuoteText } from '../store/slices/quoteSlice';

interface MainProps extends Pick<MainWrapperProps, 'openDrawer'> {}
export default function Main(props: MainProps) {
  const [quotesList, setQuotesList] = useState<string[]>([]);
  const dispatch = useDispatch();
  const quoteGenre = useSelector(selectQuoteGenre);

  const fetchData = useCallback(async () => {
      const response = await getQuotesList(quoteGenre);
      setQuotesList(response);
      console.log(quoteGenre, response[0])
      dispatch(setQuoteText(response[0]))
  }, []);

  useEffect(() => {
      fetchData();
  }, [quoteGenre]);

  return (
    <MainWrapper {...props} category={"main"} quotesList={quotesList} />
  );
}
