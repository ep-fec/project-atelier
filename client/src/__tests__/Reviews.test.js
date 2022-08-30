/**
 * @jest-environment jsdom
 */

import React from 'react';
import axios from 'axios';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Reviews from './../components/reviews/Reviews.jsx';
import data from '../__mocks__/sampleData.js';

const server = setupServer(
  rest.get('/reviews', (req, res, ctx) => {
    return res(ctx.json(data.reviews));
  }),
  rest.put('/reviews/:review_id/helpful', (req, res, ctx) => {
    return res(ctx.json({helpful: true}));
  }),
);

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('Main Reviews Component', () => {

  test('Renders the sorting options', async () => {
    render(<Reviews currentProduct={{ id: 71697 }} />);
    expect(screen.findByText('-Sort Options Placeholder-')).toBeDefined();
  });

  test('Renders the product breakdown', async () => {
    render(<Reviews currentProduct={{ id: 71697 }} />);
    expect(screen.findByText('Product Breakdown')).toBeDefined();
  });

  test('Renders the product ratings', async () => {
    render(<Reviews currentProduct={{ id: 71697 }} />);
    expect(screen.findByText('Rating Breakdown')).toBeDefined();
  });

});

describe('Reviews List', () => {

  test('Does not display the \'More Reviews\' button when there are no reviews', async () => {
    render(<Reviews />);
    const button = await screen.queryByText('MORE REVIEWS');
    expect(button).toBe(null);
  });

  test('Renders 2 reviews by default', async () => {
    render(<Reviews currentProduct={{ id: 71697 }} />);
    const reviewone = await screen.findByText('Good quality');
    const reviewtwo = await screen.findByText('Palatino test');
    expect(reviewone).toBeDefined();
    expect(reviewtwo).toBeDefined();
  });

  test('Loads 2 more reviews when \'More Reviews\' is clicked', async () => {
    render(<Reviews currentProduct={{ id: 71697 }} />);
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', {name: 'MORE REVIEWS'}));
    });
    const reviewthree = await screen.findByText('Just really bad');
    const reviewfour = await screen.findByText('Just alright');
    expect(reviewthree).toBeDefined();
    expect(reviewfour).toBeDefined();
  });

});

describe('Individual Review', () => {

  test('Marks a review as helpful when \'Yes\' is clicked ', async () => {
    let helpSpy;
    server.use(
      rest.put('/reviews/:review_id/helpful', (req, res, ctx) => {
        helpSpy = true;
        return res(ctx.json({helpful: true}));
      })
    )
    render(<Reviews currentProduct={{ id: 71697 }} />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', {name: 'Yes'})[0]);
    });
    expect(helpSpy).toBe(true);
  });

  test('Reports a review when \'Report\' is clicked', async () => {
    let reportSpy;
    server.use(
      rest.put('/reviews/:review_id/report', (req, res, ctx) => {
        reportSpy = true;
        return res(ctx.json({reported: true}));
      })
    )
    render(<Reviews currentProduct={{ id: 71697 }} />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', {name: 'Report'})[0]);
    });
    expect(reportSpy).toBe(true);
  });

  test('Displays thumbnail images in the review', async () => {
    render(<Reviews currentProduct={{ id: 71697 }} />);
    await waitFor(() => {
      const thumbnail = screen.getByRole('img');
      expect(thumbnail).toBeDefined();
    });
  });

  // test('Opens a modal when an image is clicked', async () => {
  //   // jest.mock('react-dom', () => {
  //   //   return {
  //   //     ...jest.requireActual('react-dom'),
  //   //     createPortal: (element, target) => {
  //   //       return element;
  //   //     }
  //   //   }
  //   // });
  //   const modalroot = document.createElement('div');

  //   render(<Reviews currentProduct={{ id: 71697 }} />);
  //   await waitFor(() => {
  //     const thumbnail = screen.getByRole('img');
  //     console.log(thumbnail);
  //     // fireEvent.click(thumbnail);
  //   });

  // });

  // test('Modal contains a close button', async () => {
  //   render(<Reviews currentProduct={{ id: 71697 }} />);
  //   await waitFor(() => {
  //     const thumbnail = screen.getByRole('img');
  //     fireEvent.click(thumbnail);
  //   });
  //   // const modal = screen.getByRole('button', {name: 'CLOSE'})
  //   // expect(modal).toBeDefined();

  // });

});




