import React, { useState, useEffect } from 'react';

const Ratings = (props) => {
  let data = props.reviews;
  let [totalReviews, setTotalReviews] = useState(0);
  let [totalRating, setTotalRating] = useState('');
  let [recommendations, setRecommendations] = useState(0);
  let recCounter = 0;

  const ratings = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0
  }

  useEffect(() => {
    if (data?.length) {
      setTotalReviews(data.length);
    }
  }, [props.reviews]);

  useEffect(() => {
    if (totalReviews) {
      setTotalRating(calcRating().toFixed(1));
    }
  }, [totalReviews])

  function calcRating() {
    data.forEach((review) => {
      ratings[review.rating]++;
      review.recommend ? recCounter++ : null;
    });
    setRecommendations(Math.ceil((recCounter / totalReviews) * 100));
    let scoreTotal = (ratings[1] * 1) + (ratings[2] * 2) + (ratings[3] * 3) + (ratings[4] * 4) + (ratings[5] * 5);
    return scoreTotal / totalReviews;
  }



  return (
    <div className="reviews rating-breakdown">
      <div className="reviews rating-header">
        <h1 className="reviews total-rating">{totalRating} </h1>
        <span className="reviews stars rating-stars" style={{'--rating':  totalRating}}></span>
      </div>
      <span className="reviews recommend-product">{recommendations}% of reviews recommend this product</span>

    </div>
  )
}

export default Ratings;