import React, { useState, useEffect } from 'react';
import List from './components/List.jsx';
import Review from './components/Review.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import Ratings from './components/Ratings.jsx';
import Sort from './components/Sort.jsx';
import axios from 'axios';

const Reviews = (props) => {

  let [reviews, setReviews] = useState({results: []});

  const getReviews = () => {
    axios.get(`/reviews?product_id=${props.currentProduct.id}&count=1000&sort=newest`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (props.currentProduct?.id) {
      getReviews();
    }
  }, [props.currentProduct]);

  return (
    <section id="reviews-container">
      <h2>RATINGS & REVIEWS </h2>
      <br/><br/>

      <section className="reviews leftcol">
        <Ratings reviews={reviews?.results}/>
        <ProductBreakdown reviews={reviews}/>
      </section>

      <section className="reviews rightcol">
        <Sort reviews={reviews}/>
        <List reviews={reviews}/>
      </section>
    </section>
  )
}

export default Reviews;