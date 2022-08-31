import React, { useState, useEffect } from 'react';

const Ratings = (props) => {
  let data = props.reviews;
  let [totalReviews, setTotalReviews] = useState(0);
  let [totalRating, setTotalRating] = useState('');

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
      console.log(ratings);
    }
  }, [totalReviews])

  function calcRating() {
    data.forEach((review) => {
      ratings[review.rating]++;
    });
    let scoreTotal = (ratings[1] * 1) + (ratings[2] * 2) + (ratings[3] * 3) + (ratings[4] * 4) + (ratings[5] * 5);
    return scoreTotal / totalReviews;
  }



  return (
    <div className="reviews rating-breakdown">
      <h1 className="reviews total-rating">{totalRating}</h1>

    </div>
  )
}

export default Ratings;