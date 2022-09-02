import React, {useState, useEffect} from 'react';
import axios from 'axios';
import $ from 'jquery';
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
import AddToCart from './AddToCart.jsx';
import Star from './Star.jsx';
import ProductDescription from './ProductDescription.jsx';

export default function Overview({currentProduct, currentRating}) {
  const [allStyles, setAllStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('-');
  const [announcementNumber, setAnnouncementNumber] = useState(0);

  useEffect(() => {
    $('.overViewMainContainer').find('*').addClass('overview');
  }, []);

  useEffect(() => {
    getAllStyles(currentProduct.id);
  }, [currentProduct.id]);

  // getAllStyles
  const getAllStyles = (id) => {
    axios({
      method: 'POST',
      url: 'allStyles',
      data: id,
      headers: {
        'Content-type': 'text/plain'
      }
    })
    .then(response => {
      setAllStyles(response.data);
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
          <ImageGallery selectedStyle={selectedStyle}/>
        </div>

        <div className='productInfoContainer'>
          <div className='ratingContainer'>
            <Rating currentRating={currentRating}/>
          </div>

          <div className='categoryContainer'>
            <Category category={currentProduct.category}/>
          </div>

          <div className='titleContainer'>
            <Title name={currentProduct.name}/>
          </div>

          <div className='priceContainer'>
            <Price selectedStyle={selectedStyle}/>
          </div>

          <div className='styleSelectorContainer'>
            <StyleSelector
              allStyles={allStyles}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
            />
          </div>

          <div className='sizeAndQuantityContainer'>
            <div className='sizeSelectorContainer'>
              <SizeSelector
                selectedStyle={selectedStyle}
                setSelectedSize={setSelectedSize}
              />
            </div>

            <div className='quantitySelectorContainer'>
              <QuantitySelector
                selectedStyle={selectedStyle}
                selectedSize={selectedSize}
                selectedQuantity={selectedQuantity}
                setSelectedQuantity={setSelectedQuantity}
              />
            </div>
          </div>

          <div className='addToCartAndStarContainer'>
            <div className='addToCartContainer'>
              <AddToCart />
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