import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BookCard } from '..';
import { Book } from '../../services/types';

import './styles.scss';

const BookSearch: React.FC = () => {
  const [books, handleBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          '?q=a' +
          '&key=' +
          process.env.REACT_APP_API_KEY,
        // +'&maxResults=40',
      )
      .then(data => {
        console.log(data.data.items);
        handleBooks(data.data.items);
      });
  }, []);
  return (
    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="book-search mt-4">
      <h2 className="justify-content pt-2">Resultado da pesquisa</h2>
      <Row>
        {books.map((book: Book) => (
          <Col key={book.id} xs={12} sm={12} md={6} lg={3} xl={3}>
            <BookCard {...book} />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default BookSearch;
