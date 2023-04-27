import MainWrapper, { MainWrapperProps } from './MainWrapper';
import { useEffect } from 'react';
import useFavorite from '../hooks/useFavorite';

interface FavoritesProps extends Pick<MainWrapperProps, 'openDrawer'> {}
export default function Favorites(props: FavoritesProps) {
  const {removeAllFavorites} = useFavorite();

  useEffect(() => {
    // removeAllFavorites()
  }, [])

  return <MainWrapper {...props} quotesList={[]} category="favorites" />
}

