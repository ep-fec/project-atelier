import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

const Modal = ({ open, close, children}) => {

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay"></div>
      <div className="reviews-modal">
        <div className="reviews-modal-image-container">
          {children}
        </div>
      </div>
    </>,
    document.getElementById('modal-root')
  )
};

export default Modal;