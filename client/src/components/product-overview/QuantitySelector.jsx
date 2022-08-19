import React from 'react';

export default function QuantitySelector({selectedStyle, selectedSize}) {
  const classes = 'buttonsAndDropdowns quantitySelectorDropdown'

  return (
      <select className={classes} defaultValue='1'>
        <option disabled> SELECT QUANTITY </option>
        <option value='1'> 1 </option>
        <option value='2'> 2 </option>
        <option value='3'> 3 </option>
      </select>
  )
}