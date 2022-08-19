import React, {useState, useEffect} from 'react';

export default function ImageGallery({selectedStyle}) {
  const [mainPhoto, setMainPhoto] = useState('');
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const [showForwardArrow, setShowForwardArrow] = useState(true);
  const [showBackArrow, setShowBackArrow] = useState(false);
  const [showUpArrow, setShowUpdArrow] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState(false);

  useEffect(() => {
    if (selectedStyle !== '') {
      setMainPhoto(selectedStyle.photos[mainPhotoIndex].url);

      if ((mainPhotoIndex) === (selectedStyle.photos.length - 1)) {
        setShowForwardArrow(false);
      } else {
        setShowForwardArrow(true);
      }

      if (mainPhotoIndex === 0) {
        setShowBackArrow(false);
      } else {
        setShowBackArrow(true);
      }

/*       if (selectedStyle.photos.length > 7) {
        setShowDownArrow(true);
      } else {
        setShowDownArrow(false);
      } */
    }

  }, [selectedStyle, mainPhotoIndex, showForwardArrow, showBackArrow])


  const handleThumbnailPhotoClick = (e) => {
    setMainPhoto(selectedStyle.photos[e.target.id].url);
    setMainPhotoIndex(parseInt(e.target.id));
  }

  const handleMainPhotoForwardClick = () => {
    if ((mainPhotoIndex + 1) < selectedStyle.photos.length) {
      setMainPhotoIndex(mainPhotoIndex + 1);
      setMainPhoto(selectedStyle.photos[mainPhotoIndex].url);
    }
  }

  const handleMainPhotoBackClick = () => {
    if ((mainPhotoIndex - 1) >= 0) {
      setMainPhotoIndex(mainPhotoIndex - 1);
      setMainPhoto(selectedStyle.photos[mainPhotoIndex].url);
    }
  }

  return (
    <div className='imageGalleryComponentContainer'>
      {selectedStyle !== '' &&
        <div className='mainImage'
          style={{backgroundImage: `url(${mainPhoto})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center'
          }}
        >
          <div className='thumbnailImagesContainer'>
            <div className='thumbnailUpArrow'>
              UP
            </div>

            <ol className='thumbnailListContainer'>
              {selectedStyle.photos.map((photo, index) => (
                <li className='thumbnailListItems' key={index}>
                  <img className='thumbnailImages'
                    src={photo.thumbnail_url}
                    key={index}
                    onClick={handleThumbnailPhotoClick}
                    id={index}
                  />
                </li>
              ))}
            </ol>

            <div className='thumbnailDownArrow'>
                DOWN
            </div>
          </div>

          <div className='arrows'>
            {showBackArrow && (
              <div className='mainPhotoBackArrow'
                onClick={handleMainPhotoBackClick}
              >
                BACK
              </div>
            )}

            {showForwardArrow && (
              <div className='mainPhotoForwardArrow'
                onClick={handleMainPhotoForwardClick}
              >
                FORWARD
              </div>
            )}

          </div>
        </div>
      }
    </div>
  )
}