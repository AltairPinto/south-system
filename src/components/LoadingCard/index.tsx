import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

import './styles.scss';

const LoadingCard: React.FC = () => {
  return (
    <Card className="book-card-loading">
      <CardHeader
        action={null}
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton animation="wave" variant="rect" className="media" />
      <CardContent>
        <>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </>
      </CardContent>
    </Card>
  );
};

export default LoadingCard;
