import React, {useState, useEffect} from 'react';

export default function QuantitySelector({selectedStyle, selectedSize, selectedQuantity, setSelectedQuantity}) {
  const [selectDisable, setSelectDisable] = useState(true);
  const [quantityArray, setQuantityArray] = useState([]);
  const [defaultSize, setDefaultSize] = useState('-');

  useEffect(() => {
    if (selectedSize !== '') {
      setSelectDisable(false);
      setDefaultSize('1');
      setQuantityArray(updateQuantity(selectedStyle));
    }
  }, [selectedSize]);

  const updateQuantity = (selectedStyle) => {
    let returnArray = [];

    if (selectedStyle.skus !== undefined) {
      Object.keys(selectedStyle.skus).map((key, index) => {
        if (selectedSize === selectedStyle.skus[key].size) {
          if (selectedStyle.skus[key].quantity > 15) {
            for (let i = 1; i <= 15; i++) {
              returnArray.push(i);
            }
          } else {
            for (let i = 1; i <= selectedStyle.skus[key].quantity; i++) {
              returnArray.push(i);
            }
          }
        }
      })
    }
    return returnArray;
  };

  const handleQuantitySelectClick = (e) => {
    setSelectedQuantity(e.target.value);
  };

  const classes = 'buttonsAndDropdowns quantitySelectorDropdown';

  return (
    <select className={classes}
      disabled={selectDisable}
      onChange={handleQuantitySelectClick}
      defaultValue={defaultSize}
      key={defaultSize}
    >
      <option disabled> SELECT QUANTITY </option>
      <option disabled hidden={!selectDisable}> - </option>
      {
        quantityArray.length !== 0 && (
          quantityArray.map(elem => (
            <option key={elem} value={elem}> {elem} </option>
          ))
        )
      }
    </select>
  )
}