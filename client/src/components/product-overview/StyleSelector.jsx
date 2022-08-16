import React from 'react';

export default function StyleSelector() {
  return (
    <div>
      StyleSelector
      <div>
        <div> STYLE > </div>
        <div> Selected Style </div>
      </div>

      <div className='styleThumbnails'>
        <div className='thumbnail'></div>
        <div className='thumbnail'></div>
        <div className='thumbnail'></div>
        <div className='thumbnail'></div>
        <div className='thumbnail'></div>
        <div className='thumbnail'></div>
        <div className='thumbnail'></div>
        <div className='thumbnail'></div>
      </div>
    </div>
  )
}