import React from 'react';
/* import sample from '../../assets/sampleImage.tif'; */

export default function ImageGallery({selectedStyle}) {
  return (
    <div className='imageGalleryComponentContainer'>
      <div className='mainImage'>
        {selectedStyle != '' && <img src={selectedStyle.photos[0].url}/>}

        <div className='thumbnailImagesContainer'>

        </div>

        <div className='downArrow'>

        </div>

        <div className='forwardArrow'>

        </div>

        <div className='backArrow'>

        </div>
      </div>

    </div>
  )
}