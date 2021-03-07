import { Skeleton } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BookCard, LoadingCard, NotFound, Pagination } from '..';
import { Book } from '../../services/types';
import { ApplicationState } from '../../store';

import './styles.scss';

const BookSearch: React.FC = () => {
  const word = useSelector((state: ApplicationState) => state.word);

  const [books, handleBooks] = useState<Book[]>([]);
  const [totalItems, handleTotalItems] = useState<number>(0);
  const [currentPage, handleCurrentPage] = useState<number>(1);
  const booksPerPage = 9;
  const startIndex =
    currentPage > 1 ? currentPage * booksPerPage : currentPage - 1;
  const paginate = (pageNumber: number) => handleCurrentPage(pageNumber);

  const [loading, handleLoading] = useState<boolean>(false);

  const scrollTo = useRef<null | HTMLInputElement>(null);

  const loadingPage = () => {
    const loadingArr = [];
    for (let i = 0; i < booksPerPage; i++) {
      loadingArr.push(
        <Col key={i} xs={12} sm={6} md={4} lg={4} xl={3}>
          <LoadingCard />
        </Col>,
      );
    }
    return loadingArr;
  };

  // const scrollTo = (ref: HTMLElement) => {
  //   if (ref) {
  //     ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // };

  useEffect(() => {
    if (word.data) {
      handleLoading(true);
      axios
        .get(
          process.env.REACT_APP_API_URL +
            '?q=' +
            word.data +
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
            handleLoading(false);
            scrollTo.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        })
        .catch(() => {
          handleLoading(false);
        });
    }
  }, [currentPage, startIndex, word]);

  return (
    <Col
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      className="book-search fade-in"
      ref={scrollTo}
    >
      {word.data && totalItems > 0 && (
        <>
          <h3 className="justify-content pt-2 pb-2">
            {totalItems > 0 && !loading ? (
              <>Total de livros encontrados: {totalItems}</>
            ) : (
              <Skeleton animation="wave" variant="text" width="100%" />
            )}
          </h3>
          <Row className="fade-in mt-4" aria-label="book-board">
            {loading
              ? loadingPage()
              : books?.map((book: Book) => (
                  <Col key={book.etag} xs={12} sm={6} md={4} lg={4} xl={3}>
                    <BookCard {...book} />
                  </Col>
                ))}
          </Row>
          <Col>
            <Pagination
              totalPosts={totalItems as number}
              postsPerPage={booksPerPage}
              paginate={paginate}
            />
          </Col>
        </>
      )}
      {totalItems === 0 && word.data && !loading && <NotFound />}
    </Col>
  );
};

export default BookSearch;
