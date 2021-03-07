import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BookCard, LoadingCard, Pagination } from '..';
import { Book } from '../../services/types';
import { ApplicationState } from '../../store';

import './styles.scss';

const BookFavorites: React.FC = () => {
  const favorites = useSelector((state: ApplicationState) => state.favorites);

  const [totalItems, handleTotalItems] = useState<number>(0);
  const [currentPage, handleCurrentPage] = useState<number>(1);
  const booksPerPage = 6;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks =
    favorites.data && favorites.data.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber: number) => handleCurrentPage(pageNumber);

  const [loading, handleLoading] = useState<boolean>(false);

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

  useEffect(() => {
    if (favorites.data) {
      handleLoading(true);
      handleTotalItems(favorites.data.length);
      handleLoading(false);
    }
  }, [favorites]);

  return (
    <Col
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      className="book-favorites fade-in mt-4"
    >
      {favorites.data && totalItems > 0 && (
        <>
          <h3 className="justify-content pt-2 pb-2">
            {totalItems > 0 && !loading ? (
              <>Lista de favoritos: {totalItems}</>
            ) : (
              <Skeleton animation="wave" variant="text" width="100%" />
            )}
          </h3>
          <Row className="fade-in mt-4" aria-label="book-favorites">
            {loading
              ? loadingPage()
              : currentBooks?.map((book: Book) => (
                  <Col key={book.etag} xs={12} sm={6} md={6} lg={4} xl={3}>
                    <BookCard {...book} />
                  </Col>
                ))}
          </Row>
          {totalItems > booksPerPage && (
            <Col>
              <Pagination
                totalPosts={totalItems as number}
                postsPerPage={booksPerPage}
                paginate={paginate}
              />
            </Col>
          )}
        </>
      )}
    </Col>
  );
};

export default BookFavorites;
