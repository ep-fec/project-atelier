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
      setMainPhoto(selectedStyle.photos[mainPhotoIndex].url);
      setMainPhotoIndex(mainPhotoIndex + 1);
    }
  }

  const handleMainPhotoBackClick = () => {
    if ((mainPhotoIndex - 1) >= 0) {
      setMainPhoto(selectedStyle.photos[mainPhotoIndex].url);
      setMainPhotoIndex(mainPhotoIndex - 1);
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
{/*               <li>hellooo</li>
              <li>hellooo</li>
              <li>hellooo</li>
              <li>hellooo</li> */}
            </ol>

            <div className='thumbnailDownArrow'>
                DOWN
            </div>
          </div>

          <div className='forwardBackArrows'>
            {showBackArrow && (
              <div className='mainPhotoBackArrow'
                onClick={handleMainPhotoBackClick}
              >
                <i className="fa-solid fa-angle-left"></i>
              </div>
            )}

            {showForwardArrow && (
              <div className='mainPhotoForwardArrow'
                onClick={handleMainPhotoForwardClick}
              >
                <i class="fa-solid fa-angle-right"></i>
              </div>
            )}

          </div>
        </div>
      }
    </div>
  )
}