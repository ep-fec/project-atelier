import react, { useState } from 'react';
import Modal from './Modal.jsx';

const Image = (props) => {

  let [showModal, setShowModal] = useState(false);

  return (
    <>
    <img className="reviews review-thumbnail"
      onClick={() => setShowModal(true)}
      src={props.photo.url + '?tr=w-400,h-300,bl-30,q-50'}/>

    <Modal className="reviews reviews-modal" open={showModal} close={() => setShowModal(false)}>
      HI
    </Modal>
    </>
  )
}

export default Image;