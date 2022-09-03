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

  return (
    <div className='styleComponentContainer'>
      <div className='styleText'>
        STYLE > {selectedStyle.name}
      </div>

      <div className='styleThumbnailsGrid'>
        {allStyles.length !== 0 && (
          allStyles.map((style, index) => {
            let showCheckmark = checkmarkStatus[index] ? 'styleThumbnailCheckmark' : null;

            return (
<<<<<<< HEAD
              <>
              <img className={`thumbnail ${showCheckmark}`}
                src={style.photos[0].thumbnail_url}
                key={index}
                onClick={handleStyleSelectClick}
                name={style.name}
                id={index}
              />
              {showCheckmark && (<i className="fas fa-check-circle"></i>)}
              </>
=======
              <div className='styleThumbnailAndCheckmark'>
                <img className={`styleThumbnail ${showCheckmark}`}
                  src={style.photos[0].thumbnail_url}
                  key={index}
                  onClick={handleStyleSelectClick}
                  name={style.name}
                  id={index}
                />
                {showCheckmark && (<i class="fas fa-check-circle"></i>)}
              </div>
>>>>>>> c65f4f5e357d5e129824ae6b906b88b6024d8438
            )
          })
        )}
      </div>
    </div>
  )
}