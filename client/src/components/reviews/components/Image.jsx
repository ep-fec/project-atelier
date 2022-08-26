import react, { useState } from 'react';
import Modal from './Modal.jsx';

const Image = (props) => {

  let [openModal, toggleModal] = useState(false);

  return (
    <>
    <img className="reviews review-thumbnail"
    onClick={() => <Modal show={true}/>}
    src={props.photo.url}/>
    </>
  )
}

export default Image;