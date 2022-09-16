import React, { useState, useEffect, useReducer } from 'react';

const Ratings = (props) => {
  let data = props.reviews;
  let [ratings, setRatings] = useState({'1': 0, '2': 0,'3': 0,'4': 0,'5': 0})
  let [totalReviews, setTotalReviews] = useState(0);
  let [totalRating, setTotalRating] = useState('');
  let [recommendations, setRecommendations] = useState(0);
  let [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    if (props.shouldRun) {
      if (data?.length) {
        setTotalReviews(data.length);
      }
      setRatings({'1': 0, '2': 0,'3': 0,'4': 0,'5': 0});
      setRecommendations(0)
      handleFilterReset();
    }
  }, [data]);

  useEffect(() => {
    if (totalReviews) {
      calcRating();
    }
  }, [totalReviews])

  useEffect(() => {
    if (totalReviews) {
      let scoreTotal = (ratings[1] * 1) + (ratings[2] * 2) + (ratings[3] * 3) + (ratings[4] * 4) + (ratings[5] * 5);
      let r = (scoreTotal / totalReviews).toFixed(1);
      setTotalRating(r);
      props.changeRating(r);
    }
  }, [ratings])

  function percentCalc(x, y) {
    if (totalReviews === 0) {
      return 0;
    }
    return Math.ceil((x / y) * 100) + '%';
  }

  useEffect(() => {
    handleActiveFilters();
  }, [props.filters])

  function calcRating() {
    let recCounter = 0;
    data.forEach((review) => {
      let rating = review.rating;
      setRatings(ratings => ({...ratings, [rating]: ratings[rating] + 1}))
      review.recommend ? recCounter++ : null;
    });
    setRecommendations(Math.ceil((recCounter / totalReviews) * 100));
  }

  function handleFilterChange(rating) {
    props.setFilter(filters => ({...filters, [rating]: !filters[rating]}));
  }

  function handleFilterReset() {
    props.setFilter({1: false, 2: false, 3: false, 4:false, 5: false})
  }

  function handleActiveFilters() {
    let actFilters = [];
    for (let key in props.filters) {
      if (props.filters[key]) {
        actFilters.push(key);
      }
    }
    if (actFilters.length === 5) {
      handleFilterReset();
    } else {
      setActiveFilters(actFilters);
    }
  }

  return (
    <div className="reviews rating-breakdown-container">
      <div className="reviews rating-header">
        <h1 className="reviews total-rating">{totalRating} </h1>
        <span className="reviews stars rating-stars" style={{'--rating':  totalRating}}></span>
      </div>

      <span className="reviews recommend-product">{recommendations}% of reviews recommend this product</span>
      <br/>

      <div className="reviews rating-breakdown" onClick={() => handleFilterChange(5)}>

        <div className="reviews rating-leftcol">
          5 Stars
        </div>
        <div className="reviews rating-midcol">
          <div className="reviews rating-bar-container">
            <div className="reviews rating-bar"
            style={{'--rating-bar-size': (percentCalc(ratings['5'], totalReviews))}}></div>
          </div>
        </div>
        <div className="reviews rating-rightcol">
           ({ratings[5]})
        </div>
      </div>

      <div className="reviews rating-breakdown" onClick={() => handleFilterChange(4)}>
        <div className="reviews rating-leftcol">
          4 Stars
        </div>
        <div className="reviews rating-midcol">
          <div className="reviews rating-bar-container">
            <div className="reviews rating-bar"
            style={{'--rating-bar-size': (percentCalc(ratings['4'], totalReviews))}}></div>
          </div>
        </div>
        <div className="reviews rating-rightcol">
           ({ratings[4]})
        </div>
      </div>

      <div className="reviews rating-breakdown" onClick={() => handleFilterChange(3)}>
        <div className="reviews rating-leftcol">
          3 Stars
        </div>
        <div className="reviews rating-midcol">
          <div className="reviews rating-bar-container">
            <div className="reviews rating-bar"
            style={{'--rating-bar-size': (percentCalc(ratings['3'], totalReviews))}}></div>
          </div>
        </div>
        <div className="reviews rating-rightcol">
           ({ratings[3]})
        </div>
      </div>

      <div className="reviews rating-breakdown" onClick={() => handleFilterChange(2)}>
        <div className="reviews rating-leftcol">
          2 Stars
        </div>
        <div className="reviews rating-midcol">
          <div className="reviews rating-bar-container">
            <div className="reviews rating-bar"
            style={{'--rating-bar-size': (percentCalc(ratings['2'], totalReviews))}}></div>
          </div>
        </div>
        <div className="reviews rating-rightcol">
           ({ratings[2]})
        </div>
      </div>

      <div className="reviews rating-breakdown" onClick={() => handleFilterChange(1)}>
        <div className="reviews rating-leftcol">
          1 Stars
        </div>
        <div className="reviews rating-midcol">
          <div className="reviews rating-bar-container">
            <div className="reviews rating-bar"
            style={{'--rating-bar-size': (percentCalc(ratings['1'], totalReviews))}}></div>
          </div>
        </div>
        <div className="reviews rating-rightcol">
           ({ratings[1]})
        </div>
      </div>
      <br/>
    {activeFilters.length
    ? <div className="reviews ratings-footer"><span className="reviews shown-ratings">Filtering by {activeFilters.join(', ')} stars reviews. </span>
    <span className="reviews remove-filters" onClick={() => handleFilterReset()}>Remove all filters</span></div>
    : null}
    </div>
  )
}

export default Ratings;