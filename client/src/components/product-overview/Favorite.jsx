import {React, useState} from 'react';

export default function Favorite({addToMyOutfit, currentProductId}) {
  const handleFavoriteButtonClick = () => {
    addToMyOutfit(currentProductId);
  }

  return (
      <button
        className='buttonsAndDropdowns favoriteButton'
        onClick={handleFavoriteButtonClick}
      >
        <i className="fa-regular fa-heart"></i>
      </button>
  )
}