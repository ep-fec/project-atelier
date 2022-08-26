import React, { useState, useEffect } from 'react';

const Modal = ({ open, close, children}) => {

  if (!open) {
    return null;
  }

  return (
    <div>
      {children}
      <button onClick={close}>Close Modal</button>
    </div>
  )
};

export default Modal;