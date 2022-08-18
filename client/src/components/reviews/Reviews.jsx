import React from 'react';

const Reviews = (props) => {


  return (
    <section className="reviews-container">
      <h2>RATINGS & REVIEWS </h2>
      <br/><br/>

      <section className="reviews leftcol">
        <div className="reviews rating-breakdown">Rating Breakdown</div>
        <div className="reviews product-breakdown">Product Breakdown</div>
      </section>

      <section className="reviews rightcol">
        <div className="reviews sort-options">**Sort Options**</div>
        <div className="reviews reviews-list">Reviews List Box
          <div className="reviews individual-review">----Individual Reviews-----</div>
        </div>
        <br/>
        <button className="reviews more-reviews reviewsbutton">MORE REVIEWS</button>
        <button className="reviews add-review reviewsbutton">ADD A REVIEW +</button>
      </section>
    </section>
  )
}

export default Reviews;