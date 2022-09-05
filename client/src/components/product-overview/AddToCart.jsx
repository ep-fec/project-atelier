import React from 'react';
import $ from 'jquery';

export default function AddToCart({selectedSize, selectedQuantity, selectRef}) {
  const handleAddToCartButtonClick = () => {
    if (selectedSize === '') {
      selectRef.current.focus();
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