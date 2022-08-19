import React from 'react';

export default function Price({selectedStyle}) {
  return (
    <>
      {selectedStyle.sale_price !== null && (
        <>
          <div className='salePrice'>
            {selectedStyle.sale_price}
          </div>
          <div className='originalPrice'>
            {selectedStyle.original_price}
          </div>
        </>
      )}

      {selectedStyle.sale_price === null && (
        <div className='price'>
          {selectedStyle.original_price}
        </div>
      )}
    </>
  )
}