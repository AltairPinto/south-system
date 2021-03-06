import React from 'react';
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { refactorAuthors } from '../../services/mask';
import { Book as BookType } from '../../services/types';
import { ApplicationState } from '../../store';
import {
  removeFavorites,
  updateFavorites,
} from '../../store/ducks/favorites/action';

import './styles.scss';

const BookCard: React.FC<BookType> = book => {
  const favorites = useSelector((state: ApplicationState) => state.favorites);
  const dispatch = useDispatch();
  const { volumeInfo, saleInfo } = book;
  const { authors, title, description, previewLink } = volumeInfo;

  const checkFavorite = favorites.data.filter(
    (favorite: BookType) => favorite.id === book.id,
  ).length;

  return (
    <Card className="book-card">
      {volumeInfo && (
        <Card.Body>
          <Card.Title>
            <Row className="card-top">
              <Col xs={6}>
                <img
                  className="thumb"
                  src={
                    volumeInfo.imageLinks
                      ? volumeInfo.imageLinks.thumbnail
                      : require('../../images/produto-sem-imagem.png')
                  }
                  alt="thumbnail"
                  height="180"
                  width="140"
                />
              </Col>
              <Col xs={6}>
                <OverlayTrigger
                  overlay={
                    <Tooltip id={book.id + '_t_' + book.etag}>{title}</Tooltip>
                  }
                  key={book.id + '_t_' + book.etag}
                  placement="top"
                >
                  <b>
                    {title.length > 30 ? title.substring(0, 30) + '...' : title}
                  </b>
                </OverlayTrigger>
                <Card.Subtitle className="mb-2 text-muted">
                  {refactorAuthors(authors)?.length > 20 ? (
                    <OverlayTrigger
                      overlay={
                        <Tooltip id={book.id + '_x_' + book.etag}>
                          {refactorAuthors(authors)}
                        </Tooltip>
                      }
                      key={book.id + '_x_' + book.etag}
                      placement="top"
                    >
                      <b>{refactorAuthors(authors).substring(0, 20) + '...'}</b>
                    </OverlayTrigger>
                  ) : refactorAuthors(authors)?.length ? (
                    <b>{refactorAuthors(authors)}</b>
                  ) : (
                    'Autor n??o identificado'
                  )}
                  <p>
                    Idioma: <b>{volumeInfo.language.toUpperCase()}</b>
                  </p>
                </Card.Subtitle>
              </Col>
            </Row>
          </Card.Title>
          <Card.Text>{description ? description : 'Sem descri????o'}</Card.Text>
          <Row className="justify-content">
            <Col xs={2} className="favorite">
              <OverlayTrigger
                overlay={
                  <Tooltip id={book.id + '_i_' + book.etag}>
                    {checkFavorite
                      ? 'Remover dos favoritos'
                      : 'Adicionar aos favoritos'}
                  </Tooltip>
                }
                key={book.id + '_i_' + book.etag}
                placement="top"
              >
                <img
                  aria-label={'btn-favorite-' + book.id}
                  src={
                    checkFavorite
                      ? require('../../images/stars/10.svg')
                      : require('../../images/stars/0.svg')
                  }
                  alt="favorite"
                  onClick={() =>
                    checkFavorite
                      ? dispatch(removeFavorites(book))
                      : dispatch(updateFavorites(book))
                  }
                />
              </OverlayTrigger>
            </Col>
            <Col xs={5}>
              <Card.Subtitle>
                {saleInfo.listPrice && (
                  <b>
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: saleInfo.listPrice.currencyCode,
                    }).format(saleInfo.listPrice.amount)}
                  </b>
                )}
              </Card.Subtitle>
            </Col>
            <Col xs={5}>
              <Card.Link
                className="float-right"
                href={previewLink}
                target="_blank"
              >
                Saiba mais
              </Card.Link>
            </Col>
          </Row>
        </Card.Body>
      )}
    </Card>
  );
};

export default BookCard;
