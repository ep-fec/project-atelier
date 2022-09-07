import React, {useState, useEffect} from 'react';

export default function ImageGallery({
  selectedStyle,
  onImageClick,
  expandView,
  setExpandView}) {

  const [mainPhoto, setMainPhoto] = useState('');
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0);
  const [showForwardArrow, setShowForwardArrow] = useState(true);
  const [showBackArrow, setShowBackArrow] = useState(false);
  const [showUpArrow, setShowUpdArrow] = useState(true);
  const [showDownArrow, setShowDownArrow] = useState(true);

  useEffect(() => {
    if (selectedStyle !== '') {
      setMainPhoto(selectedStyle.photos[mainPhotoIndex].url);

      if (mainPhotoIndex === (selectedStyle.photos.length - 1)) {
        setShowForwardArrow(false);
        setShowDownArrow(false);
      } else {
        setShowForwardArrow(true);
        setShowDownArrow(true);
      }

      if (mainPhotoIndex === 0) {
        setShowBackArrow(false);
        setShowUpdArrow(false);
      } else {
        setShowBackArrow(true);
        setShowUpdArrow(true);
      }

      /* if (selectedStyle.photos.length > 7) {
        setShowDownArrow(true);
      } else {
        setShowDownArrow(false);
      } */
    }
  }, [selectedStyle, mainPhotoIndex, showForwardArrow, showBackArrow])

  const handleThumbnailPhotoClick = (e) => {
    setMainPhotoIndex(parseInt(e.target.id));
  }

  const handleMainPhotoForwardClick = () => {
    if ((mainPhotoIndex + 1) < selectedStyle.photos.length) {
      setMainPhotoIndex(prevIndex => prevIndex + 1);
    }
  }

  const handleMainPhotoBackClick = () => {
    if ((mainPhotoIndex - 1) >= 0) {
      setMainPhotoIndex(prevIndex => prevIndex - 1);
    }
  }

  const handleUpArrowClick = () => {
    if ((mainPhotoIndex - 1) >= 0) {
      setMainPhotoIndex(prevIndex => prevIndex - 1);
    }
  }

  const handleDownArrowClick = () => {
    if ((mainPhotoIndex + 1) < selectedStyle.photos.length) {
      setMainPhotoIndex(prevIndex => prevIndex + 1);
    }
  }

  const handleMainImageClick = () => {
    setExpandView(true);
    console.log('main image clicked');
  }

  return (
    <div className='imageGalleryComponentContainer'>
{/*       {selectedStyle !== '' && (
        <>
          <div className='background'
            onClick={handleMainImageClick}
            style={{
            backgroundImage: `url(${mainPhoto})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center'
          }}
          ></div>

          <div className='child'>
            CHILD
            <div className='hello'> HELLO </div>
            <div className='hell'> GO TO HELL </div>
            <div className='blah'> BLAH </div>
          </div>
        </>
      )} */}

      {selectedStyle !== '' && (
        <>
          <div className='background'
            onClick={handleMainImageClick}
            style={{
            backgroundImage: `url(${mainPhoto})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center'
          }}
          ></div>

          <div className='child'>
            <div className='thumbnailImagesContainer'>
                {showUpArrow && (
                  <div className='thumbnailUpArrow'
                    onClick={handleUpArrowClick}
                  >
                    <i className="fa-solid fa-angle-up"></i>
                  </div>
                )}

                <ol className='thumbnailListContainer'>
                  {selectedStyle.photos.map((photo, index) => (
                    <li className='thumbnailListItems' key={index}>
                      <img className='thumbnailImages'
                        src={photo.thumbnail_url}
                        key={index}
                        onClick={handleThumbnailPhotoClick}
                        id={index}
                        alt='Image cannot be loaded'
                      />
                    </li>
                  ))}
                </ol>

                {showDownArrow && (
                  <div className='thumbnailDownArrow'
                    onClick={handleDownArrowClick}
                  >
                      <i className="fa-solid fa-angle-down"></i>
                  </div>
                )}
            </div>

            <div className='arrows'>
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
                    <i className="fa-solid fa-angle-right"></i>
                  </div>
                )}


            </div>
          </div>
        </>
      )}



     {/*  {selectedStyle !== '' &&
        <>
          <div className='mainImage'
              onClick={handleMainImageClick}
              style={{
              backgroundImage: `url(${mainPhoto})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }}
          ></div>

          <div className='galleryComponents'>
            <div className='gridgrid'>
              <div className='thumbnailImagesContainer'>
                {showUpArrow && (
                  <div className='thumbnailUpArrow'
                    onClick={handleUpArrowClick}
                  >
                    <i className="fa-solid fa-angle-up"></i>
                  </div>
                )}

                <ol className='thumbnailListContainer'>
                  {selectedStyle.photos.map((photo, index) => (
                    <li className='thumbnailListItems' key={index}>
                      <img className='thumbnailImages'
                        src={photo.thumbnail_url}
                        key={index}
                        onClick={handleThumbnailPhotoClick}
                        id={index}
                        alt='Image cannot be loaded'
                      />
                    </li>
                  ))}
                </ol>

                {showDownArrow && (
                  <div className='thumbnailDownArrow'
                    onClick={handleDownArrowClick}
                  >
                      <i className="fa-solid fa-angle-down"></i>
                  </div>
                )}
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
                    <i className="fa-solid fa-angle-right"></i>
                  </div>
                )}


</div>
            </div>
          </div>
        </>
      } */}
    </div>
  )
}