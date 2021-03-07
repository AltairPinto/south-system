import React from 'react';
import { BookFavorites, BookSearch, SearchBar } from '../../components';

const Home: React.FC = () => {
  return (
    <>
      <SearchBar />
      <BookFavorites />
      <BookSearch />
    </>
  );
};

export default Home;
