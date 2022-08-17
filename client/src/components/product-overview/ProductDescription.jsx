import React from 'react';

export default function ProductDescription(props) {
  return (
    <div className="productDescriptionComponentContainer">
      <div className='productSlogan'>
        {props.slogan}
      </div>

      <div className='productDescription'>
        {props.description}
      </div>
    </div>
  )
}