import react, { useState } from 'react';
import Modal from './Modal.jsx';

const Image = (props) => {

  let [showModal, setShowModal] = useState(false);

  return (
    <>
    <img className="reviews review-thumbnail"
      onClick={() => setShowModal(true)}
      src={props.photo.url + '?tr=w-400,h-300,bl-30,q-50'}/>

    <Modal open={showModal} close={() => setShowModal(false)}>
      <img className="reviews modal-image" src={props.photo.url}/>
    </Modal>
    </>
  )
}

export default Image;