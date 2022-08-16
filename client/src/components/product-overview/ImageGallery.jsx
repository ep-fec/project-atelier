import React from 'react';
/* import sample from '../../assets/sampleImage.tif'; */

export default function ImageGallery() {
  return (
    <div className='imageGalleryComponentContainer'>
      ImageGallery
      <div className='mainImage'>
        {/* <img src={sample}></img> */}
        Main Image

        <div className='thumbnailImagesContainer'>
          thumbnails
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