import React from 'react';

const Reviews = (props) => {


  return (
    <div className="reviews main">
      Ratings & Reviews
      <section className="reviews leftcol">
        <div className="reviews rating-breakdown">Rating Breakdown</div>
        <div className="reviews product-breakdown">Product Breakdown</div>
      </section>
      <section className="reviews-rightcol">
        <div className="reviews sort-options">Sort Options</div>
        <div className="reviews reviews-list">Reviews List
          <div className="reviews individual-review">Individual Review</div>
        </div>
      </section>
      <button className="reviews more-reviews">More Reviews</button>
      <button className="reviews add-review">Add Review</button>
    </div>
  )
}

export default Reviews;