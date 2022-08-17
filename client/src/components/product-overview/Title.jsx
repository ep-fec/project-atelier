import React from 'react';

export default function Title(props) {
  console.log('props', props);
  return (
    <div>
      {props.name}
    </div>
  )
}