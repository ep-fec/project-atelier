import React from 'react';

export default function SizeSelector({selectedStyle, setSelectedSize}) {
  const classes = 'buttonsAndDropdowns sizeSelectorDropdown'

  const handleSizeSelectClick = (e) => {
    setSelectedSize(e.target.value);
  }

  return (
      <select className={classes} defaultValue='SELECT SIZE'
        onChange={handleSizeSelectClick}
      >
        <option disabled> SELECT SIZE </option>
        {
          selectedStyle.skus != undefined && (
            Object.keys(selectedStyle.skus).map((key, index) => (
              <option key={index}
                value={selectedStyle.skus[key].size}
              >
                {selectedStyle.skus[key].size}
              </option>
            ))
          )
        }
      </select>
  )
}