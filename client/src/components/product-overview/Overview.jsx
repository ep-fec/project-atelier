import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from './Navbar.jsx';
import Announcement from './Announcement.jsx';
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
  // States
  const [currentProduct, setCurrentProduct] = useState('');
  const [announcementNumber, setAnnouncementNumber] = useState(0);

  // Functions
  useEffect(async() => {
    await getInitialProduct();
  }, []);

  //getFirstProduct
  const getInitialProduct = () => {
    axios.get('/initialProduct')
    .then(response => {
      setCurrentProduct(response.data);
    })
    .catch(error => {
      console.log('Error from server', error);
    });
  };

  return (
    <div className='overViewMainContainer'>
      <div className='navbarContainer'>
        <Navbar />
      </div>

      {announcementNumber >= 1 && (
        <div className='announcementContainer'>
          <Announcement />
        </div>
      )}

      <div className='overViewContainer'>
        <div className='imageGalleryContainer'>
          <ImageGallery />
        </div>

        <div className='productInfoContainer'>
          <div className='ratingContainer'>
            <Rating />
          </div>

          <div className='categoryContainer'>
            <Category category={currentProduct.category}/>
          </div>

          <div className='titleContainer'>
            <Title name={currentProduct.name}/>
          </div>

          <div className='priceContainer'>
            <Price price={currentProduct.default_price}/>
          </div>

          <div className='styleSelectorContainer'>
            <StyleSelector productId={currentProduct.id}/>
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
            <div className='addToCartContainer'>
              <AddToBag />
            </div>

            <div className='starContainer'>
              <Star />
            </div>
          </div>
        </div>
      </div>

      <div className='productDescriptionContainer'>
        <ProductDescription
          slogan={currentProduct.slogan}
          description={currentProduct.description}
        />
      </div>

    </div>
  );
};