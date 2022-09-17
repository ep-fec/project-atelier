import {React, useState, useEffect} from 'react';

export default function AddToMyOutfit({currentProductId, outfit, addToMyOutfit, removeFromMyOutfit}) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check everytime component renders for heart toggle
  useEffect(() => {
    checkFavorites();
  }, [currentProductId]);

  // Check if product id is in outfit array
  let checkFavorites = () => {
    if (!outfit.includes(currentProductId)) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  }

  const handleFavoriteButtonClick = () => {
    // Toggle isFavorite state and add/remove product id to/from outfit
    if (isFavorite === false) {
      setIsFavorite(true);
      addToMyOutfit();
    } else {
      setIsFavorite(false);
      removeFromMyOutfit();
    }
  }

  return (
    <button
      className='buttonsAndDropdowns favoriteButton'
      onClick={handleFavoriteButtonClick}
    >
      {isFavorite === false && (<i className="fa-regular fa-heart"></i>)}
      {isFavorite === true && (<i className="fa-solid fa-heart"></i>)}
    </button>
  )
}