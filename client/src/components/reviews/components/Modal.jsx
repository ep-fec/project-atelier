import React, { useState, useEffect } from 'react';

const Modal = (props) => {

let [show, toggleShow] = useState(false);

useEffect(() => {
  props.show ? toggleShow(true) : null;
}, []);

  return (
    <>
      {show ?
      <>
        <div class="reviews image-modal">This a modal</div>
        <button onClick={toggleShow(false)}>CLOSE</button>
      </>
      : null}
    </>
  )
};

export default Modal;