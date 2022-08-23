import React, { useState, useEffect } from 'react';
import List from './components/List.jsx';
import Review from './components/Review.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import Ratings from './components/Ratings.jsx';
import Sort from './components/Sort.jsx';
import NewReview from './components/NewReview.jsx';
import data from './components/sampleData.js';
import axios from 'axios';

const Reviews = (props) => {

  const getReviews = () => {
    axios.get(`/reviews?product_id=${props.currentProduct}&count=50`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }

  let [reviews, setReviews] = useState({results: []});

  useEffect(() => {
    getReviews();
  }, [props.currentProduct]);






  return (
    <section className="reviews-container">
      <h2>RATINGS & REVIEWS </h2>
      <br/><br/>

      <section className="reviews leftcol">
        <Ratings />
        <ProductBreakdown />
      </section>

      <section className="reviews rightcol">
        <Sort />
        <List reviews={reviews}/>
        <br/>
        <button className="reviews more-reviews reviewsbutton">MORE REVIEWS</button>
        <button className="reviews add-review reviewsbutton">ADD A REVIEW +</button>
      </section>
    </section>
  )
}

export default Reviews;