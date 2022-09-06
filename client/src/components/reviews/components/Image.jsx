import react, { useState } from 'react';
import Modal from './Modal.jsx';

const Image = ({photo, summary}) => {

  let [showModal, setShowModal] = useState(false);

  return (
    <>
    <img className="reviews review-thumbnail"
      onClick={() => setShowModal(true)}
      alt={summary}
      src={photo.url + '?tr=w-400,h-300,bl-30,q-50'}/>

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