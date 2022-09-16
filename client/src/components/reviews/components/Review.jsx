import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from './Image.jsx';

const Review = (props) => {
  let date = new Date(props.data.date);
  let dateOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  }

  let [helpfulVotes, setHelpfulVotes] = useState(props.data.helpfulness);
  let [hasVoted, setVotedStatus] = useState(false);
  let [hasReported, setReportStatus] = useState(false);
  let [showMore, toggleShowMore] = useState(false);
  let [showMoreContent, setShowMoreContent] = useState(false);

  useEffect(() => {
    props.data?.body?.length > 250 ? toggleShowMore(true) : null;
  }, []);

  let markHelpful = (e) => {
    if (!hasVoted) {
      axios.put(`/reviews/${props.data.review_id}/helpful`)
        .then((res) => {
          setHelpfulVotes(helpfulVotes + 1);
          setVotedStatus(true);
      })
        .catch((err) => console.log(err));
    }
  }

  let submitReport = (e) => {
    if (!hasReported) {
      axios.put(`/reviews/${props.data.review_id}/report`)
        .then((res) => setReportStatus(true))
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="reviews ind-review">

      <section className="reviews ind-review-heading">
        <><span className="reviews stars" style={{'--rating':  props.data.rating}}></span></>
        <span className="reviews ind-review-date">{date.toLocaleDateString("en", dateOptions)}</span>
        <span className="reviews ind-review-username">{props.data.reviewer_name},</span>
      </section>

      <section className="reviews ind-review-body">
        <h3 className="reviews ind-review-summary">
          {props.data?.summary?.length < 60 ? props.data.summary
          :
          `${props.data.summary.slice(0, 60)}...` }
        </h3>

        {!showMore ?
        <p className="reviews ind-review-content">{props.data.body}</p>
        : null }

        {(showMore && !showMoreContent) ?
        <><p className="reviews ind-review-content">{props.data.body.slice(0, 250)}</p>
        <div className="reviews ind-review-showmore" onClick={(e) => setShowMoreContent(true)}>SHOW MORE</div></>
        : null}

        {showMoreContent ? <p className="reviews ind-review-content">{props.data.body}</p>
        : null}
        <br/>
        <span className="reviews ind-review-recommendation">
          {props.data.recommend ? '✔️ I recommend this product' : null}
        </span>
        {props.data.response ?
        <div className="reviews ind-review-response">
          <h4 className="reviews response-title">Response from seller:</h4>
          <span className="reviews response-body">{props.data.response}</span>
        </div>
        : null}

        {props.data?.photos?.length ?
        <section className="reviews images-section">
        {props.data.photos.map((photo) => (
          <Image photo={photo} summary={props.data.summary} key={photo.id}/>
        ))}
        </section> : null}
      </section>

      <section className="reviews ind-review-footer">
        <span className="reviews ind-review-helpful">Helpful? </span>
        <span className="reviews ind-review-helpfulYes" onClick={(e) => markHelpful(e)} role="button">
          {hasVoted ? 'Marked as helpful!' : 'Yes'}</span>
        <span className="reviews ind-review-helpfulness"> ({helpfulVotes}) | </span>
        <span className="reviews ind-review-report" onClick={(e) => submitReport(e)} role="button">
          {hasReported ? 'Reported' : 'Report'}</span>
        <br/><hr className="ind-review-divider"/>
      </section>
    </div>
  )

}

export default Review;