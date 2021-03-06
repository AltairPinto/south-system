import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { refactorAuthors } from '../../services/mask';
import { Book as BookType } from '../../services/types';

import './styles.scss';

const BookCard: React.FC<BookType> = book => {
  const { volumeInfo, saleInfo, searchInfo, selfLink } = book;
  const { authors, title, description } = volumeInfo;
  return (
    <Card className="book-card">
      {volumeInfo && (
        <Card.Body>
          <OverlayTrigger
            overlay={<Tooltip id={book.id}>{title}</Tooltip>}
            key={book.id}
            placement="top"
          >
            <Card.Title>
              {title.length > 40 ? title.substring(0, 40) + '...' : title}
            </Card.Title>
          </OverlayTrigger>
          <Card.Subtitle className="mb-2 text-muted">
            {authors ? refactorAuthors(authors) : 'Autor não identificado'}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Link className="float-right" href={selfLink}>
            Saiba mais
          </Card.Link>
        </Card.Body>
      )}
    </Card>
  );
};

export default BookCard;
