import React, { useState, useEffect } from 'react';
import Review from './Review.jsx';
import Modal from './Modal.jsx';
import NewReview from './NewReview.jsx';

const List = (props) => {

  let totalReviews = props?.reviews?.results?.length;
  let [reviewLimit, increaseReviewLimit] = useState(2);
  let [maxHeight, setMaxHeight] = useState('500px');
  const [showModal, setShowModal] = useState(false);
  let reviewsLoaded = 0;

  useEffect(() => {
    if (reviewLimit === 4) {
      setMaxHeight('750px');
    }
  }, [reviewLimit])

  return (
    <>
    <div className="reviews reviews-list">
      <div className="reviews no-reviews">
        {!totalReviews ?
        <><button
            className="reviews add-review-centered reviewsbutton"
            onClick={() => setShowModal(true)}>ADD A REVIEW +
          </button>
          {showModal ?
            <Modal open={showModal}>
              <NewReview productInfo={props.productInfo} productMeta={props.productMeta}/>
              <button onClick={() => setShowModal(false)} className="reviews-modal-x">X</button>
            </Modal>
            : null}
        </>
        :null}
      </div>
      <div className="reviews reviews-list-extended" style={{'--max-height': maxHeight}}>
        {props.reviews?.results?.length ?
          props.reviews.results.map((review) => {
            if (reviewsLoaded < reviewLimit) {
              reviewsLoaded++;
              return (<Review data={review} key={review.review_id} />)
            }
          }) : null}
        <br />
      </div>
    </div>
      {(totalReviews > 2 && reviewsLoaded < totalReviews) ?
        <button className="reviews more-reviews reviewsbutton"
          onClick={(e) => increaseReviewLimit(reviewLimit + 2)}>MORE REVIEWS</button>
        : null}
        {totalReviews ?
        <><button
          className="reviews add-review reviewsbutton"
          onClick={() => setShowModal(true)}>ADD A REVIEW +</button>

          {showModal ?
            <Modal open={showModal}>
              <NewReview productInfo={props.productInfo} productMeta={props.productMeta} />
              <button onClick={() => setShowModal(false)} className="reviews-modal-x">X</button>
            </Modal>
            : null}
          </>
        : null}
    </>
  )
}

export default List;