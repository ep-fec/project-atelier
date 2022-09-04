import React from 'react';

export default function CategoryAndTitle({category, title}) {
  return (
    <>
      <div className='categoryContainer'>
        {category}
      </div>
      <div className='titleContainer'>
        {title}
      </div>
    </>
  )
}