import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './containers/App';
import { Provider } from 'react-redux';
import store from './store';

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

test('Handle input and fire button to find books', async () => {
  const { getByLabelText, getAllByText } = render(app);
  const inputElement = await waitFor(() => getByLabelText('input-search'));
  const btnElement = await waitFor(() => getByLabelText('btn-search'));

  expect(btnElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();

  fireEvent.change(inputElement, {
    target: {
      value: 'a traidora',
    },
  });

  expect(inputElement).toHaveAttribute('value', 'a traidora');

  fireEvent.click(btnElement);

  const bookBoard = await waitFor(() => getByLabelText('book-board'));

  expect(bookBoard).toBeVisible();

  const bookElement = await waitFor(() => getAllByText(/a traidora/i));

  expect(bookElement).toBeDefined();
});

test('Include books in favorites', async () => {
  const { getByLabelText, getAllByText } = render(app);
  const inputElement = await waitFor(() => getByLabelText('input-search'));
  const btnElement = await waitFor(() => getByLabelText('btn-search'));

  expect(btnElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();

  fireEvent.change(inputElement, {
    target: {
      value: 'Keeping Score',
    },
  });

  expect(inputElement).toHaveAttribute('value', 'Keeping Score');

  fireEvent.click(btnElement);

  const bookBoard = await waitFor(() => getByLabelText('book-board'));

  expect(bookBoard).toBeVisible();

  const bookElement = await waitFor(() => getAllByText(/Keeping Score/i));

  expect(bookElement).toBeDefined();

  const favoriteButton = await waitFor(() =>
    getByLabelText('btn-favorite-UzQNzgEACAAJ'),
  );

  fireEvent.click(favoriteButton);

  const bookFavorites = await waitFor(() => getByLabelText('book-favorites'));

  // console.log('bookFavorites.innerHTML', bookFavorites.innerHTML);
  expect(bookFavorites).toBeVisible();
});
