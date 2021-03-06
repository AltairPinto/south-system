import React, { useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import FontAwesome from '../FontAwesome';

import './styles.scss';

const SearchBar: React.FC = () => {
  const [bookTitle, handleBookTitle] = useState<string>('');

  const searchBook = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(bookTitle);
  };
  return (
    <Navbar className="search-bar" bg="dark" expand="lg">
      <Navbar.Brand href="/">Busque aqui pelo livro que deseja: </Navbar.Brand>
      <Form
        className="search-form"
        inline
        onSubmit={(event: React.FormEvent) => searchBook(event)}
      >
        <FormControl
          type="text"
          value={bookTitle}
          onChange={event => handleBookTitle(event.target.value)}
          placeholder="Digite o que deseja pesquisar"
          className="input mr-2"
        />
        <OverlayTrigger
          overlay={<Tooltip id="1">Pesquisar</Tooltip>}
          key={1}
          placement="bottom"
        >
          <Button className="btn-search" type="submit">
            <FontAwesome name="search" type="fas" />
          </Button>
        </OverlayTrigger>
      </Form>
    </Navbar>
  );
};

export default SearchBar;
