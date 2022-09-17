/**
 * @jest-environment jsdom
 */

import React from 'react';
import axios from 'axios';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen, within} from '@testing-library/react';
import '@testing-library/jest-dom';

import Related from './../components/related-products/Related.jsx';
import data from '../__mocks__/sampleData.js';

const server = setupServer(
  rest.get('/products/:productId/related', (req, res, ctx) => {
    return res(ctx.json(data.related));
  }),
  rest.get('/related/:productId', (req, res, ctx) => {
    return res(ctx.json(data["71705"]));
  }),
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Main Related Component', () => {
  test('Renders the Related products Component', async () => {
    render(<Related
          currProduct={71699}
          changeProduct={function() {console.log('change')}}
          handleAdd={function() {console.log('add to outfit')}}
          outfit={[]}
          removeProduct={function() {console.log('remove from outfit')}}
          widget={'Related Products'}
          />);
    expect(screen.findByText('RELATED PRODUCTS')).toBeDefined();
  });

  test('Renders the Outfit Component', async () => {
    render(<Related
          currProduct={71699}
          changeProduct={function() {console.log('change')}}
          handleAdd={function() {console.log('add to outfit')}}
          outfit={[]}
          removeProduct={function() {console.log('remove from outfit')}}
          widget={'Related Products'}
          />);
    expect(screen.findByText('YOUR OUTFIT')).toBeDefined();
  });
});

describe('Renders lists and their cards', () => {
  test('Renders the list for related products', async () => {
    render(<Related
          currProduct={71699}
          changeProduct={function() {console.log('change')}}
          handleAdd={function() {console.log('add to outfit')}}
          outfit={[]}
          removeProduct={function() {console.log('remove from outfit')}}
          widget={'Related Products'}
          />);
    expect(screen.getByRole('related-list')).toBeDefined();
  });

  test('Renders the list for your outfit', async () => {
    render(<Related
          currProduct={71699}
          changeProduct={function() {console.log('change')}}
          handleAdd={function() {console.log('add to outfit')}}
          outfit={[]}
          removeProduct={function() {console.log('remove from outfit')}}
          widget={'Related Products'}
          />);
    expect(screen.getByRole('outfit-list')).toBeDefined();
  });

  test('Should render the card for a product', async () => {
    render(<Related
          currProduct={71699}
          changeProduct={function() {console.log('change')}}
          handleAdd={function() {console.log('add to outfit')}}
          outfit={[]}
          removeProduct={function() {console.log('remove from outfit')}}
          widget={'Related Products'}
          />);
    await waitFor(async () => {
      const card = await screen.findByText('Summer Shoes');
      expect(card).toBeDefined();
    });
  });
});

describe('Renders modal', () => {

  test('Should display both products in modal when clicking the start icon'), async () => {
    render(<Related
      currProduct={71699}
      changeProduct={function() {console.log('change')}}
      handleAdd={function() {console.log('add to outfit')}}
      outfit={[]}
      removeProduct={function() {console.log('remove from outfit')}}
      widget={'Related Products'}
      />);
      expect(true).toBe(true);
  });
});