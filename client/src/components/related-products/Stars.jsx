let Stars = (props) => {
  if (props.reviews === 'No Reviews') {
    return <div></div>
  } else {
    return <p>{props.reviews} out of 5 stars</p>
  }
}

export default Stars;