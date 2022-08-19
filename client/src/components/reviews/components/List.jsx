import React from 'react';
import Review from './Review.jsx';

const List = (props) => {

  return (
    <div>Reviews List
      <div className="reviews individual-review"><Review /></div>
    </div>
  )

}

export default List;