import React, { useState, useEffect } from 'react';
import List from './components/List.jsx';
import Review from './components/Review.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import Ratings from './components/Ratings.jsx';
import Sort from './components/Sort.jsx';
import axios from 'axios';

const Reviews = (props) => {

  let [allReviews, setAllReviews] = useState({results: []});
  let [filteredReviews, setFilteredReviews] = useState({results: []});
  let [filters, setFilter] = useState({1: false, 2: false, 3: false, 4: false, 5: false});

  const getReviews = () => {
    axios.get(`/reviews?product_id=${props.currentProduct.id}&count=1000&sort=newest`)
      .then((res) => {
        setAllReviews(res.data);
        setFilteredReviews(res.data);
      })
      .catch((err) => console.log(err));
  }

  const handleFilterChange = () => {
    let filtered = [];
    let isFiltered = false;
    Object.values(filters).forEach((rating) => rating ? isFiltered = true : null);
    if (isFiltered) {
      allReviews.results.forEach((review) => {
        filters[review.rating] ? filtered.push(review) : null;
      })
      setFilteredReviews({results: filtered});
    } else {
      setFilteredReviews(allReviews);
    }
  }

  useEffect(() => {
    if (props.currentProduct?.id) {
      getReviews();
    }
  }, [props.currentProduct]);

  useEffect(() => {
    handleFilterChange();
  }, [filters]);

  return (
    <section id="reviews-container">
      <h2>RATINGS & REVIEWS </h2>
      <br/><br/>

      <section className="reviews leftcol">
        <Ratings reviews={allReviews?.results} filters={filters} setFilter={setFilter}/>
        <ProductBreakdown reviews={allReviews}/>
      </section>

      <section className="reviews rightcol">
        <Sort reviews={allReviews}/>
        <List reviews={filteredReviews} filters={filters}/>
      </section>
    </section>
  )
}

export default Reviews;