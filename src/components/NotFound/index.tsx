import React from 'react';

import './styles.scss';

const NotFound: React.FC = () => {
  return (
    <section className="justify-content text-center fade-in not-found">
      <div>
        <img
          src={require('../../images/page-not-found-404-error-vector-illustration-5de1881dd11bc@2x.png')}
          alt="404-page-not-found"
        />
        <div className="text-center not-found-content">
          <h2>Ops!</h2>
          <h5>
            Desculpe, não conseguimos localizar livros com a palavra inserida.
            Confira se está tudo correto e tente novamente.
          </h5>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
