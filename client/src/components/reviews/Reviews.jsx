import React, { useState, useEffect, useRef } from 'react';
import List from './components/List.jsx';
import Review from './components/Review.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import Ratings from './components/Ratings.jsx';
import Sort from './components/Sort.jsx';
import axios from 'axios';

const Reviews = (props) => {

  const isMounted = useRef(false);
  const [getRatings, shouldGetRatings] = useState(true);
  const [allReviews, setAllReviews] = useState({results: []});
  const [filteredReviews, setFilteredReviews] = useState({results: []});
  const [filters, setFilter] = useState({1: false, 2: false, 3: false, 4: false, 5: false});
  const [productMeta, setProductMeta] = useState({});
  const [sort, setSort] = useState('relevant');
  const [productInfo, setProductInfo] = useState({});


  const getReviews = () => {
    axios.get(`/reviews?product_id=${props.currentProduct.id}&count=20000&sort=${sort}`)
      .then((res) => setAllReviews(res.data))
      .then(() => axios.get(`/products/${props.currentProduct.id}`))
      .then((res) => setProductInfo(res.data))
      .catch((err) => console.log(err));
  }

  const getMeta = () => {
    axios.get(`/reviews/meta?product_id=${props.currentProduct.id}`)
      .then((res) => setProductMeta(res.data))
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
    handleFilterChange();
  }, [allReviews])

  useEffect(() => {
    shouldGetRatings(false);
    if (isMounted.current) {
      getReviews();
    } else {
      isMounted.current = true;
    }
  }, [sort]);

  useEffect(() => {
    if (props.currentProduct?.id) {
      shouldGetRatings(true);
      getReviews();
      getMeta();
    }
  }, [props.currentProduct]);

  useEffect(() => {
    handleFilterChange();
  }, [filters]);

  return (
    <section id="reviews-container">
      <h2 className="reviews-logo">RATINGS & REVIEWS </h2>
      <br/><br/>

      <section className="reviews leftcol">
        <Ratings reviews={allReviews?.results} filters={filters} setFilter={setFilter} shouldRun={getRatings} changeRating={props.changeRating}/>
        <ProductBreakdown meta={productMeta}/>
      </section>

      <section className="reviews rightcol">
        <Sort sort={sort} setSort={setSort} reviewsAmount={allReviews?.results?.length}/>
        <List reviews={filteredReviews} filters={filters} sort={sort} productInfo={productInfo} productMeta={productMeta}/>
      </section>
    </section>
  )
}

export default Reviews;