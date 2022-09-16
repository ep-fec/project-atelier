import React, {useState, useEffect} from 'react';
import Characteristic from './Characteristic.jsx';

const ProductBreakdown = ({meta}) => {

  const [charsLoaded, setCharsLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(meta).length && meta.characteristics) {
      setCharsLoaded(true);
    }
  }, [meta]);

  return (
    <div className="reviews product-breakdown-container">
      {charsLoaded && meta?.characteristics ?
        Object.keys(meta?.characteristics).map((char, i) => {
          return (
            <div key={meta.characteristics[char].id}>
              <Characteristic key={i} name={char} scale={meta.characteristics[char].value} />
              <hr className="product-breakdown-divider" />
            </div>
          )
        })
        : null}
    </div>
  );
}

export default ProductBreakdown;

