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

    <Modal open={showModal} close={() => setShowModal(false)}>
      <img className="reviews modal-image" src={photo.url}/>
    </Modal>
    </>
  )
}

export default Image;