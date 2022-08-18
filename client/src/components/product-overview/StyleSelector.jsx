import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function StyleSelector({allStyles, selectedStyle, setSelectedStyle}) {
  // States
/*   const [allStyles, setAllStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(''); */

  // Functions
/*   useEffect(() => {
    getAllStyles(productId);
  }, [productId]); */

  const handleStyleSelectClick = (e) => {
    //console.log('e', e);
    setSelectedStyle(allStyles[e.target.id]);
  }

  return (
    <div className='styleComponentContainer'>
      <div className='styleText'>
        STYLE > {selectedStyle.name}
      </div>

      <div className='styleThumbnailsGrid'>
        {allStyles.map((style, index) => (
          <img className='thumbnail'
            src={style.photos[0].thumbnail_url}
            key={index}
            onClick={handleStyleSelectClick}
            name={style.name}
            id={index}
          />
        ))}
      </div>
    </div>
  )
}