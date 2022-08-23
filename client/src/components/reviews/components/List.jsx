import React, { useState, useEffect } from 'react';
import Review from './Review.jsx';

const List = (props) => {

  let totalReviews = props.reviews.results.length;
  let [reviewLimit, increaseReviewLimit] = useState(2);
  let reviewsLoaded = 0;

  return (
    <><div className="reviews reviews-list">
      {props.reviews.results.length ?
        props.reviews.results.map((review) => {
          if (reviewsLoaded < reviewLimit) {
            reviewsLoaded++;
            return (<Review data={review} key={review.review_id} />)
          }
        }) : 'Be the first to leave a review!'}
      <br />
    </div>
      {(totalReviews > 2 && reviewsLoaded < totalReviews) ?
        <button className="reviews more-reviews reviewsbutton"
          onClick={(e) => increaseReviewLimit(reviewLimit + 2)}>MORE REVIEWS</button>
        : null}
      <button className="reviews add-review reviewsbutton">ADD A REVIEW +</button>
    </>
  )
}

export default List;