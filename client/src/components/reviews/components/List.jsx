import React, { useState, useEffect } from 'react';
import Review from './Review.jsx';

const List = (props) => {

  return (
    <div className="reviews reviews-list">
      {props.reviews.results.length ?
      props.reviews.results.map((review) => {
        return (<Review data={review} key={review.review_id}/>)
      }) : 'Be the first to leave a review!'}
    </div>
  )
}

export default List;