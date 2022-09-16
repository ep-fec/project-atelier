import React from 'react';
import axios from 'axios';

export default function AddToCart({
  selectedSize,
  selectedQuantity,
  selectedSku,
  errorRef}) {

  const handleAddToCartButtonClick = () => {
    if (selectedSize === '') {
      errorRef.current.focus();
    } else {
      let promises = [];

      for (let i = 0; i < selectedQuantity; i++) {
        promises.push(
          axios.post('/cart', {
            sku_id: selectedSku
          })
          .catch(err => {
            console.log('Error in /cart POST');
          })
        )
      }

      return Promise.all(promises)
      .then(() => {
        return axios.get('/cart')
        .then(response => {
          console.log('Items currently in cart', response.data);
        })
        .catch(err => {
          console.log('Error in /cart GET');
        })
      })
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