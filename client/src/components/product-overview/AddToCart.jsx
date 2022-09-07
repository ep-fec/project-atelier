import React from 'react';
import $ from 'jquery';

export default function AddToCart({
  selectedSize,
  selectedQuantity,
  errorRef}) {

  const handleAddToCartButtonClick = () => {
    if (selectedSize === '') {
      errorRef.current.focus();
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