import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { BookCard } from '..';
import { Book } from '../../services/types';
import Pagination from '../Pagination';

import './styles.scss';

const BookSearch: React.FC = () => {
  const [books, handleBooks] = useState<Book[]>([]);
  const [totalItems, handleTotalItems] = useState<number>(0);
  const [currentPage, handleCurrentPage] = useState<number>(1);
  const booksPerPage = 8;
  // const indexOfLastBook = currentPage * booksPerPage;
  // const indexOfFirstBook = indexOfLastBook - booksPerPage;
  // const currentBooks = books && books.slice(indexOfFirstBook, indexOfLastBook);
  const startIndex =
    currentPage > 1 ? currentPage * booksPerPage : currentPage - 1;
  const paginate = (pageNumber: number) => handleCurrentPage(pageNumber);

  const [loading, handleLoading] = useState<boolean>(false);

  useEffect(() => {
    handleLoading(true);
    axios
      .get(
        process.env.REACT_APP_API_URL +
          '?q=a' +
          '&key=' +
          process.env.REACT_APP_API_KEY +
          '&maxResults=' +
          booksPerPage +
          '&orderBy=newest&startIndex=' +
          startIndex,
      )
      .then(data => {
        if (data.data) {
          const { totalItems, items } = data.data;
          handleTotalItems(totalItems);
          handleBooks(items);
          // console.log('data.data', data.data);
          handleLoading(false);
        }
      })
      .catch(e => {
        handleLoading(false);
      });
  }, [currentPage]);
  return (
    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="book-search mt-4">
      <h2 className="justify-content pt-2 pb-2">
        Total de livros encontrados: {totalItems}
      </h2>
      <Row className="mt-4">
        {loading ? (
          <div className="spinner-loading">
            <Spinner
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
              className="spinner-blue"
            />
          </div>
        ) : (
          books?.map((book: Book) => (
            <Col key={book.id} xs={12} sm={12} md={6} lg={3} xl={3}>
              <BookCard {...book} />
            </Col>
          ))
        )}
      </Row>
      <Col>
        <Pagination
          totalPosts={totalItems as number}
          postsPerPage={booksPerPage}
          paginate={paginate}
        />
      </Col>
    </Col>
  );
};

export default BookSearch;
