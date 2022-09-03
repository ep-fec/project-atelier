import {React, useState, useEffect} from 'react';

export default function Rating({currentRating, numberOfReviews}) {
  let [calculatedRating, setCalculatedRating] = useState(3.4);
  let ratingExists = true;

  useEffect(() => {
    if (currentRating !== 0) {
      ratingExists = true;

      let roundedRating = Math.round(currentRating * 4) / 4;
      setCalculatedRating(3.4);
    }
  }, [currentRating]);

  return (
    // ratingExists is needed to conditionally render
    // the review stars
    ratingExists && (
      <div className='ratingComponentContainer'>
        <div className='ratingStars'
          style={{'--rating': calculatedRating}}
        >
        </div>
        <a className='reviewsLink'
          href='#reviews-container'>
            READ ALL [#] REVIEWS
            {/* READ ALL {numberOfReviews} REVIEWS */}
        </a>
      </div>
    )
  )
}