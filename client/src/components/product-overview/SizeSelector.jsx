import React from 'react';

export default function SizeSelector() {
  const classes = 'buttonsAndDropdowns sizeSelectorDropdown'
  return (
      <select className={classes} defaultValue='SELECT SIZE'>
        <option disabled> SELECT SIZE </option>
        <option> S </option>
        <option> M </option>
        <option> L </option>
      </select>
  )
}