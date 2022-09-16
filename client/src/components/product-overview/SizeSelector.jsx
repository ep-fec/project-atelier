import {React, useState, useEffect, useRef} from 'react';
import Select from 'react-select';
import $ from 'jquery';

export default function SizeSelector({
  selectedStyle,
  setSelectedSize,
  setSelectedSku,
  outOfStock,
  setOutOfStock,
  errorRef
}) {

  const optionRef = useRef();

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
    let id = $('.sizeSelectorDropdown option:selected').attr('id');
    setSelectedSku(id);
  }

  return (
    <>
    <div ref={errorRef} tabIndex="1" className="errorMsgContainer">
      <span className="errorMsg"> Please select size </span>
    </div>

    {(outOfStock === false) && (
      <select className='buttonsAndDropdowns sizeSelectorDropdown'
        defaultValue='SELECT SIZE'
        onChange={handleSizeSelectClick}
        >
        <option disabled> SELECT SIZE </option>
        {
          selectedStyle.skus !== undefined && (
            Object.keys(selectedStyle.skus).map((key, index) => (
              <option key={index}
              value={selectedStyle.skus[key].size}
              id={key}
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