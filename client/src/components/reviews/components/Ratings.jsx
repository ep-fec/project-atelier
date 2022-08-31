import React, { useState, useEffect, useReducer } from 'react';

const Ratings = (props) => {
  let data = props.reviews;
  let [ratings, setRatings] = useState({'1': 0, '2': 0,'3': 0,'4': 0,'5': 0})
  let [totalReviews, setTotalReviews] = useState(0);
  let [totalRating, setTotalRating] = useState('');
  let [recommendations, setRecommendations] = useState(0);


  useEffect(() => {
    if (data?.length) {
      setTotalReviews(data.length);
    }
  }, [props.reviews]);

  useEffect(() => {
    if (totalReviews) {
      calcRating();
    }
  }, [totalReviews])

  useEffect(() => {
    if (totalReviews) {
      let scoreTotal = (ratings[1] * 1) + (ratings[2] * 2) + (ratings[3] * 3) + (ratings[4] * 4) + (ratings[5] * 5);
      setTotalRating((scoreTotal / totalReviews).toFixed(1));
    }
  }, [ratings])

  function percentCalc(x, y) {
    return Math.ceil((x / y) * 100) + '%';
  }

  function calcRating() {
    let recCounter = 0;
    data.forEach((review) => {
      let rating = review.rating;
      setRatings(ratings => ({...ratings, [rating]: ratings[rating] + 1}))
      review.recommend ? recCounter++ : null;
    });
    setRecommendations(Math.ceil((recCounter / totalReviews) * 100));
  }

  return (
    <div className="reviews rating-breakdown-container">
      <div className="reviews rating-header">
        <h1 className="reviews total-rating">{totalRating} </h1>
        <span className="reviews stars rating-stars" style={{'--rating':  totalRating}}></span>
      </div>

      <span className="reviews recommend-product">{recommendations}% of reviews recommend this product</span>

      <div className="reviews rating-breakdown">
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
    </div>
  )
}

export default Ratings;