import React from 'react';

const Review = (props) => {
  let date = new Date(props.data.date);
  let options = {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  }

  return (
    <div className="reviews ind-review">

      <section className="reviews ind-review-heading">
        <><span className="reviews ind-review-stars" style={{'--rating':  props.data.rating}}></span></>
        <span className="reviews ind-review-date">{date.toLocaleDateString("en", options)}</span>
        <span className="reviews ind-review-username">{props.data.reviewer_name},</span>
      </section>

      <section className="reviews ind-review-body">
        <h3 className="reviews ind-review-summary">{props.data.summary}</h3>
        {/* <span className="reviews ind-review-summary">{props.data.summary}</span> */}
        <p className="reviews ind-review-content">{props.data.body}</p>
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