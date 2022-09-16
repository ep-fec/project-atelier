import react, { useState } from 'react';
import Modal from './Modal.jsx';

const Image = ({photo, summary}) => {

  let [showModal, setShowModal] = useState(false);

  let url = new URL(photo.url);
  let currentParams = new URLSearchParams(photo.url);
  currentParams.set('w', 200);
  currentParams.set('q', 20);
  url.search = currentParams.toString();
  let finalUrl = url.toString();

  return (
    <>
    <img className="reviews review-thumbnail"
      height="100"
      width="100"
      loading="eager"
      onClick={() => setShowModal(true)}
      alt={summary}
      src={finalUrl}/>

    {showModal ?
    <Modal open={showModal}>
      <img className="reviews modal-image" src={photo.url}/>
      <button onClick={() => setShowModal(false)} className="reviews-modal-image-button">CLOSE</button>
    </Modal>
    : null}
    </>
  )
}

export default Image;