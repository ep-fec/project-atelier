import react, { useState } from 'react';

const Image = (props) => {

  let [openModal, toggleModal] = useState(false);


  return (
    <div className="reviews review-images">
      <img className="reviews review-thumbnail" src={props.photo[0].url}/>
    </div>
  )
}

export default Image;