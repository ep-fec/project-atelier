import React from 'react';
import List from './components/List.jsx';
import Review from './components/Review.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import Ratings from './components/Ratings.jsx';
import Sort from './components/Sort.jsx';
import NewReview from './components/NewReview.jsx';

const Reviews = (props) => {


  return (
    <section className="reviews-container">
      <h2>RATINGS & REVIEWS </h2>
      <br/><br/>

      <section className="reviews leftcol">
        <div className="reviews rating-breakdown"><Ratings /></div>
        <div className="reviews product-breakdown"><ProductBreakdown /></div>
      </section>

      <section className="reviews rightcol">
        <div className="reviews sort-options"><Sort /></div>
        <div className="reviews reviews-list"><List /></div>
        <br/>
        <button className="reviews more-reviews reviewsbutton">MORE REVIEWS</button>
        <button className="reviews add-review reviewsbutton">ADD A REVIEW +</button>
      </section>
    </section>
  )
}

export default Reviews;