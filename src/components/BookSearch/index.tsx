import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BookCard } from '..';
import { Book } from '../../services/types';
import Pagination from '../Pagination';

import './styles.scss';

const BookSearch: React.FC = () => {
  const [books, handleBooks] = useState<Book[]>([]);
  const [currentPage, handleCurrentPage] = useState(1);
  const booksPerPage = 12;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books && books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber: number) => handleCurrentPage(pageNumber);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          '?q=a' +
          '&key=' +
          process.env.REACT_APP_API_KEY +
          '&maxResults=40',
      )
      .then(data => {
        console.log(data.data.items);
        handleBooks(data.data.items);
      });
  }, []);
  return (
    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="book-search mt-4">
      <h2 className="justify-content pt-2 pb-2">Resultado da pesquisa</h2>
      <Row>
        {currentBooks.map((book: Book) => (
          <Col key={book.id} xs={12} sm={12} md={6} lg={3} xl={3}>
            <BookCard {...book} />
          </Col>
        ))}
      </Row>
      <Col>
        <Pagination
          totalPosts={books?.length as number}
          postsPerPage={10}
          paginate={paginate}
        />
      </Col>
    </Col>
  );
};

export default BookSearch;
