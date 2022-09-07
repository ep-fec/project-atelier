import {React, useState, useEffect} from 'react';
import Select from 'react-select';

export default function SizeSelector({
  selectedStyle,
  setSelectedSize,
  outOfStock,
  setOutOfStock,
  selectRef
}) {

  useEffect(() => {
    if (selectedStyle.skus !== undefined) {
      if (selectedStyle.skus[null]) {
        setOutOfStock(true);
      } else {
        setOutOfStock(false);
      }
    }
  }, [selectedStyle])

  const handleSizeSelectClick = (e) => {
    setSelectedSize(e.target.value);
  }

  return (
    <>
    {(outOfStock === false) && (
      <select className='buttonsAndDropdowns sizeSelectorDropdown'
        defaultValue='SELECT SIZE'
        onChange={handleSizeSelectClick}
        ref={selectRef}
      >
        <option disabled> SELECT SIZE </option>
        {
          selectedStyle.skus !== undefined && (
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
    )}

    {(outOfStock === true) && (
      <select className='buttonsAndDropdowns styleOutOfStock'
      disabled='true'
      defaultValue='OUT OF STOCK'
      >
        <option disabled> OUT OF STOCK </option>
      </select>
    )}
    </>
  )
}