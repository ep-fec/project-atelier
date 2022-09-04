import React from 'react';

export default function Favorite() {
  const classes = 'buttonsAndDropdowns favoriteButton'
  return (
      <button className={classes}>
        <i className="fa-regular fa-heart"></i>
      </button>
  )
}