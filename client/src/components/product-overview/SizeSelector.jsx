import {React, useState, useEffect} from 'react';
import Select from 'react-select';

export default function SizeSelector({
  selectedStyle,
  setSelectedSize,
  outOfStock,
  setOutOfStock,
  selectRef
}) {
  let optionsArray = [];
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (selectedStyle.skus !== undefined) {
      if (selectedStyle.skus[null]) {
        setOutOfStock(true);
      } else {
        setOutOfStock(false);
      }

      Object.keys(selectedStyle.skus).map((key, index) => {
        optionsArray.push({
          value: selectedStyle.skus[key].size,
          label: selectedStyle.skus[key].size
        });
      })
      setOptions(optionsArray);
    }
  }, [selectedStyle])

  const handleSizeSelectClick = (selectedValue) => {
    setSelectedSize(selectedValue.value);
  }

  return (
    <>
    {(outOfStock === false) && (
      <Select className='buttonsAndDropdowns sizeSelectorDropdown'
        ref={selectRef}
        openMenuOnFocus={true}
        onChange={handleSizeSelectClick}
        options={options}
        placeholder='SELECT SIZE'
      />
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