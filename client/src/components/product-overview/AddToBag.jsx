import React from 'react';

export default function AddToBag() {
  const classes = 'buttonsAndDropdowns addToCartButton'
  return (
      <button className={classes}>
        <div> ADD TO CART </div>
        <div> + </div>
      </button>
  )
}