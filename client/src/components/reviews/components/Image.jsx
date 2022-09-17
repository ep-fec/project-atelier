import React, { useState } from 'react';
import Modal from './Modal.jsx';

const Image = ({photo, summary}) => {

  let [showModal, setShowModal] = useState(false);

  return (
    <>
    <img className="reviews review-thumbnail"
      height="100"
      width="100"
      loading="eager"
      onClick={() => setShowModal(true)}
      alt={summary}
      src={photo.url}/>

    {showModal ?
    <Modal open={showModal}>
          <img className="reviews modal-image" alt={summary} src={photo.url} onClick={() => setShowModal(false)}/>
      <button onClick={() => setShowModal(false)} className="reviews-modal-image-button">CLOSE</button>
    </Modal>
    : null}
    </>
  )
}

export default Image;