/** @jest-environment jsdom */

import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Overview from './../components/product-overview/Overview.jsx';
import data from '../__mocks__/overviewSampleData.js';

const server = setupServer(
  rest.get('/initialProduct', (req, res, ctx) => {
    return res(ctx.json(data.initialProduct));
  }),
  rest.post('/allStyles', (req, res, ctx) => {
    return res(ctx.json(data.productStyles));
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Main overview component', () => {
  test('Renders the overview component', async () => {
    render(<Overview currentProduct={data.initialProduct}/>);
    expect(screen.getByRole('navigation')).toBeDefined();
  });

  test('Renders the add to cart button', async () => {
    render(<Overview currentProduct={data.initialProduct}/>);
    expect(screen.getByRole('button', {name: /add to cart \+/i})).toBeDefined();
  });

  test('Rendering "SELECT SIZE" when size not selected', async () => {
    render(<Overview currentProduct={data.initialProduct}/>);
    expect(screen.getByDisplayValue('SELECT SIZE')).toBeDefined();
  });
})