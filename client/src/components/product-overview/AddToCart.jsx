import React from 'react';

export default function AddToCart() {
  const classes = 'buttonsAndDropdowns addToCartButton'
  return (
      <button className={classes}>
        <div> ADD TO CART </div>
        <div> + </div>
      </button>
  )
}