import React from 'react';

export default function SizeSelector({selectedStyle}) {
  const classes = 'buttonsAndDropdowns sizeSelectorDropdown'
  return (
      <select className={classes} defaultValue='SELECT SIZE'>
        <option disabled> SELECT SIZE </option>
       {/*  <option> S </option>
        <option> M </option>
        <option> L </option> */}
        {
          selectedStyle.skus != undefined &&
          Object.keys(selectedStyle.skus).map((key, index) => (
            //console.log('keyy', selectedStyle.skus[key])
            //console.log('key', key)
            <option key={index}> {selectedStyle.skus[key].size} </option>
          ))
        }
      </select>
  )
}