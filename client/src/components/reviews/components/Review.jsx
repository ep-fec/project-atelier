import React from 'react';

const Review = (props) => {

  return (
    <div className="reviews ind-review">

      <section className="reviews ind-review-heading">
        <span className="reviews ind-review-stars">Star Rating Placeholder ☆</span>
        <span className="reviews ind-review-date">Date of Review</span>
        <span className="reviews ind-review-username">Reviewer Name,</span>
      </section>

      <section className="reviews ind-review-body">
        <h3 className="reviews ind-review-title">REVIEW TITLE</h3>
        <span className="reviews ind-review-summary">Summary of the review...</span>
        <p className="reviews ind-review-content">Review Content and body and many words and some other things that will be in the reivew and more words and just some text and other things.</p>
        <span className="reviews ind-review-recommendation">√ Recommendation</span>
      </section>

      <section className="reviews ind-review-footer">
        <div className="reviews ind-review-response">
          <h4 className="reviews response-title">RESPONSE:</h4>
          <span className="reviews response-body">Some response body.</span>
        </div>
        <span className="reviews ind-review-helpful">Helpful? </span>
        <span className="reviews ind-review-report">| Report</span>
        <hr/>
      </section>
    </div>
  )

}

export default Review;