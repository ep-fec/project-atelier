import React, {useState, useEffect} from 'react';
import Characteristic from './Characteristic.jsx';

const ProductBreakdown = ({meta}) => {

  const [charsLoaded, setCharsLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(meta).length) {
      setCharsLoaded(true);
    }
  }, [meta]);

  return (
    <div className="reviews product-breakdown-container">
      {charsLoaded ?
      Object.keys(meta?.characteristics).map((char) => {
        return (
          <div key={meta.characteristics[char].id}>
            <Characteristic name={char} scale={meta.characteristics[char].value}/>
            <hr className="product-breakdown-divider"/>
          </div>
        )})
      : null}
    </div>
  );
}

export default ProductBreakdown;

