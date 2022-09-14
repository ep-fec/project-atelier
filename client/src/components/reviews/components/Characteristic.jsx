import React from 'react';

const Characteristic = ({name, scale}) => {

  const characteristics = {
    Size: ['A size too small', 'A size too wide'],
    Width: ['Too narrow', 'Too wide'],
    Comfort: ['Uncomfortable', 'Perfect'],
    Quality: ['Poor', 'Perfect'],
    Length: ['Runs short', 'Runs long'],
    Fit: ['Runs tight', 'Runs long'],
  }


  const arrowPosition = scale === null ? 0 : ((scale - 1) * 100 / (5 - 1));


  return (

    <div className="reviews product-breakdown">
      <div className="reviews char-label">{name}</div>
      <div className="reviews product-breakdown-leftcol">
        <div className="reviews product-breakdown-bar"></div>
      </div>
      <div className="reviews product-breakdown-midcol">
        <div className="reviews product-breakdown-bar"></div>
      </div>
      <div className="reviews product-breakdown-rightcol">
        <div className="reviews product-breakdown-bar"></div>
      </div><br/>
      <div className="reviews product-breakdown-desc"></div>

      <div className="product-breakdown-arrowcont">
        <div className="reviews product-breakdown-arrow" style={{'--char-arrow-pos': arrowPosition + '%'}}></div>
      </div>

      <div className="reviews product-breakdown-leftcol">
        <div className="product-breakdown-chardesc">{characteristics[name][0]}</div>
      </div>
      <div className="reviews product-breakdown-midcol">
      <div className="product-breakdown-chardesc"></div>
      </div>
      <div className="reviews product-breakdown-rightcol">
      <div className="product-breakdown-chardesc">{characteristics[name][1]}</div>
    </div>
  </div>
  );
};

export default Characteristic;
