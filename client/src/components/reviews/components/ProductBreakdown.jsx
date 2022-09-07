import React from 'react';

const ProductBreakdown = (props) => {

  return (
    <div className="reviews product-breakdown-container">

      <div className="reviews product-breakdown">
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
          <div className="reviews product-breakdown-arrow"></div>
        </div>

        <div className="reviews product-breakdown-leftcol">
          <div className="product-breakdown-chardesc">Too small</div>
        </div>
        <div className="reviews product-breakdown-midcol">
        <div className="product-breakdown-chardesc">Perfect</div>
        </div>
        <div className="reviews product-breakdown-rightcol">
        <div className="product-breakdown-chardesc">Too big</div>
        </div><br/>
      </div>

    </div>
  )

}

export default ProductBreakdown;