import { useEffect, useState } from 'react';

import { SideBar, GenreResponseProps } from './components/SideBar';
import { Content, MovieProps } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar callbackFunc={handleClickButton} selectedGenreId={selectedGenreId} />

      <Content selectedGenre={selectedGenre} selectedGenreId={selectedGenreId} />
    </div>
  )
}