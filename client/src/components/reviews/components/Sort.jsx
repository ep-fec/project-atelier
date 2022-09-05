import React from 'react';

const Sort = ({sort, setSort, reviewsAmount}) => {

  return (
    <div className="reviews sort-options-container">
      <span className="reviews sort-options">{reviewsAmount} reviews, sorted by </span>
      <span className="reviews current-sort">{sort} ▾</span>
      <button onClick={() => setSort('newest')}>newest</button>
      <button onClick={() => setSort('relevant')}>relevant</button>
      <button onClick={() => setSort('helpful')}>helpful</button>
    </div>
  )

}

export default Sort;