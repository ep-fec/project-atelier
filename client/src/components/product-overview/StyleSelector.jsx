import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function StyleSelector({allStyles, selectedStyle, setSelectedStyle}) {
  useEffect(() => {
    if (allStyles.length !== 0) {
      setSelectedStyle(allStyles[0]);
    }
  }, [allStyles])

  const handleStyleSelectClick = (e) => {
    setSelectedStyle(allStyles[e.target.id]);
  }

  return (
    <div className='styleComponentContainer'>
      <div className='styleText'>
        STYLE > {selectedStyle.name}
      </div>

      <div className='styleThumbnailsGrid'>
        {allStyles.length !== 0 && (
          allStyles.map((style, index) => (
            <img className='thumbnail'
              src={style.photos[0].thumbnail_url}
              key={index}
              onClick={handleStyleSelectClick}
              name={style.name}
              id={index}
            />
          ))
        )}
      </div>
    </div>
  )
}