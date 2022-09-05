import React from 'react';

export default function AddToCart({selectedSize}) {
  const handleAddToCartButtonClick = () => {
    if (selectedSize === '') {

    }
  }

  return (
    <button className='buttonsAndDropdowns addToCartButton'
      onClick={handleAddToCartButtonClick}
    >
      <div> ADD TO CART </div>
      <div> + </div>
    </button>
  )
}