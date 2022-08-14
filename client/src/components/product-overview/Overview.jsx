import React, {useState} from 'react';
import Navbar from './Navbar.jsx';
import ImageGallery from './ImageGallery.jsx';
import Rating from './Rating.jsx';
import Category from './Category.jsx';
import Title from './Title.jsx';
import Price from './Price.jsx';
import StyleSelector from './StyleSelector.jsx';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import AddToBag from './AddToBag.jsx';
import Star from './Star.jsx';
import ProductDescription from './ProductDescription.jsx';

export default function Overview() {
  // States go here
  const [count, setCount] = useState(0);

  return (
    <div className='overViewMainContainer'>
      <div className='navbarContainer'>
        <Navbar />
      </div>

      <div className='overViewContainer'>
        <div className='imageGalleryContainer'>
          <ImageGallery />
        </div>

        <div className='productInfoContainer'>
          <div className='ratingContainer'>
            <Rating />
          </div>

          <div className='categoryContainer'>
            <Category />
          </div>

          <div className='titleContainer'>
            <Title />
          </div>

          <div className='priceContainer'>
            <Price />
          </div>

          <div className='styleSelector'>
            <StyleSelector />
          </div>

          <div className='sizeAndQuantityContainer'>
            <div className='sizeSelectorContainer'>
              <SizeSelector />
            </div>

            <div className='quantitySelectorContainer'>
              <QuantitySelector />
            </div>
          </div>

          <div className='addToBagAndStarContainer'>
            <div className='addToBagContainer'>
              <AddToBag />
            </div>

            <div className='starContainer'>
              <Star />
            </div>
          </div>
        </div>
      </div>

      <div className='productDescriptionContainer'>
        <ProductDescription />
      </div>

    </div>
  );
};