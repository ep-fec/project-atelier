import React from 'react';

export default function ProductDescription({slogan, description}) {
  return (
    <>
      <div className='productSlogan'>
        {slogan}
      </div>

      <div className='productDescription'>
        {description}
      </div>
    </>
  )
}