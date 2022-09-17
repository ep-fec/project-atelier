import React, {useState, useEffect, useCallback, useRef} from 'react';

export default function ImageGallery({
  selectedStyle,
  onImageClick,
  expandView,
  setExpandView,
  zoomView,
  setZoomView}) {

  const [mainPhoto, setMainPhoto] = useState('');
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const [showForwardArrow, setShowForwardArrow] = useState(true);
  const [showBackArrow, setShowBackArrow] = useState(false);
  const [showUpArrow, setShowUpdArrow] = useState(true);
  const [showDownArrow, setShowDownArrow] = useState(true);
  const [selectStatus, setSelectStatus] = useState([]);
  const [zoomPos, setZoomPos] = useState({x: '', y: ''});
  const mainImageRef = useRef();

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
    }

  }, [selectedStyle, mainPhotoIndex, showForwardArrow, showBackArrow])

  useEffect(() => {
    if (selectedStyle !== '') {
      setSelectStatus(setSelectToTrue(mainPhotoIndex));
    }
  }, [selectedStyle, mainPhotoIndex])

  const setAllSelectToFalse = () => {
    let array = [];
    selectedStyle.photos.map(style => {
      array.push(false);
    })
    return array;
  }

  const setSelectToTrue = (target) => {
    let array = setAllSelectToFalse();
    array[target] = true;
    return array;
  }

  const handleThumbnailPhotoClick = (e) => {
    setMainPhotoIndex(parseInt(e.target.id));
    setSelectStatus(prevState => setSelectToTrue(e.target.id));
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

  const handleMainImageClick = (e) => {
    if (expandView === false) {
      setExpandView(true);
    }

    if (expandView === true) {
      setZoomView(true);
      setZoomPos({
        x: e.clientX,
        y: e.clientY
      })
      mainImageRef.current.addEventListener('mousemove', zoomMove)
    }

    if (zoomView === true) {
      setZoomView(false);
      mainImageRef.current.removeEventListener('mousemove', zoomMove)
    }
  }

  const zoomMove = useCallback((e) => {
    console.log('i am moving');
    setZoomPos({
      x: e.pageX,
      y: e.pageY
    })
  },[zoomMove])

  const handleXmarkClick = (e) => {
    if (expandView === true) {
      setExpandView(false);
      mainImageRef.current.removeEventListener('mousemove', zoomMove)
    }
  }

  return (
    <div className='imageGalleryComponentContainer'>
      {selectedStyle !== '' && (
        <>
          <div className='mainImage'
            ref={mainImageRef}
            onClick={handleMainImageClick}
            style={{
              backgroundImage: `url(${mainPhoto})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              cursor: expandView ? '' : 'zoom-in',
              maxHeight: expandView ? '50rem' : '35rem',
          }}
          >
            <div className={zoomView ? 'square' : null}
              style={{
                left: zoomPos.x + 'px',
                top: zoomPos.y + 'px'
              }}
            >
            </div>
          </div>

          <div className='thumbnailComponentContainer'>
            <div className='thumbnailImagesContainer'>
                {showUpArrow && (
                  <div className='thumbnailUpArrow'
                    onClick={handleUpArrowClick}
                  >
                    <i className="fa-solid fa-angle-up"></i>
                  </div>
                )}

                <ol className='thumbnailListContainer'>
                  {selectedStyle.photos.map((photo, index) => {
                    let showSelect = selectStatus[index] ? 'selectStatus' : null;
                    return (
                      <li className='thumbnailListItems' key={index}>
                        <img className={`thumbnailImages ${showSelect}`}
                          src={photo.thumbnail_url}
                          key={index}
                          onClick={handleThumbnailPhotoClick}
                          id={index}
                          alt='Image cannot be loaded'
                        />
                      </li>
                    )
                  })}
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

              {expandView && !zoomView && (
                <div className='xmark'
                  style={{
                    display: expandView ? 'flex' : 'none',
                  }}
                  onClick={handleXmarkClick}
                >
                  <i className="fa-solid fa-xmark"></i>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}