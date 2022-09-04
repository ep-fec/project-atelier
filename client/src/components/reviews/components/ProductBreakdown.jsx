import React from 'react';
import Characteristic from './Characteristic.jsx';

const ProductBreakdown = (props) => {

  return (
    <div className="reviews product-breakdown-container">
      <Characteristic meta={props.meta}/>

    </div>
  )

}

export default ProductBreakdown;