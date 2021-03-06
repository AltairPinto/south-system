import React from 'react';
import { Card } from 'react-bootstrap';
import { Book as BookType } from '../../services/types';

import './styles.scss';

const BookCard: React.FC<BookType> = book => {
  const { volumeInfo, saleInfo, searchInfo, selfLink } = book;
  return (
    <Card className="book-card">
      <Card.Body>
        <Card.Title>{volumeInfo.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {volumeInfo.authors}
        </Card.Subtitle>
        <Card.Text>{volumeInfo.description}</Card.Text>
        <Card.Link className="float-right" href={selfLink}>
          Saiba mais
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
