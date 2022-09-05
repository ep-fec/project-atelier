import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function StyleSelector({allStyles, selectedStyle, setSelectedStyle}) {
  const [checkmarkStatus, setCheckmarkStatus] = useState([]);

  useEffect(() => {
    if (allStyles.length !== 0) {
      setSelectedStyle(allStyles[0]);
      setCheckmarkStatus(setCheckmarkToTrue(0));
    }
  }, [allStyles])

  const handleStyleSelectClick = (e) => {
    setSelectedStyle(allStyles[e.target.id]);
    setCheckmarkStatus(prevState => setCheckmarkToTrue(e.target.id));
  }

  // Helper function
  const setAllCheckmarkToFalse = () => {
    let array = [];
    allStyles.map(style => {
      array.push(false);
    })
    return array;
  }

  // Helper function
  const setCheckmarkToTrue = (target) => {
    let array = setAllCheckmarkToFalse();
    array[target] = true;
    return array;
  }

  let smallStyleThumbnail = null;
  if (allStyles.length > 8) {
    smallStyleThumbnail = 'smallStyleThumbnail';
  }
  return (
    <div className='styleComponentContainer'>
      <div className='styleTextContainer'>
        <div className='styleText'> STYLE >> </div>
        <div className='selectedStyleText'> {selectedStyle.name} </div>
      </div>

      <div className='styleThumbnailsGrid'>
        {allStyles.length !== 0 && (
          allStyles.map((style, index) => {
            let showCheckmark = checkmarkStatus[index] ? 'styleThumbnailCheckmark' : null;

            return (
              <div className='styleThumbnailAndCheckmark' key={index}>
                <img className={`styleThumbnail ${showCheckmark} ${smallStyleThumbnail}`}
                  src={style.photos[0].thumbnail_url}
                  key={index}
                  onClick={handleStyleSelectClick}
                  name={style.name}
                  id={index}
                />
                {showCheckmark && (
                  <i className="fas fa-check-circle"></i>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}