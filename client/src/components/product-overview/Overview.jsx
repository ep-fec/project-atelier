import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar from './Navbar.jsx';
import Announcement from './Announcement.jsx';
import ImageGallery from './ImageGallery.jsx';
import Rating from './Rating.jsx';
import CategoryAndTitle from './CategoryAndTitle.jsx';
import Price from './Price.jsx';
import StyleSelector from './StyleSelector.jsx';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import AddToCart from './AddToCart.jsx';
import AddToMyOutfit from './AddToMyOutfit.jsx';
import ProductDescription from './ProductDescription.jsx';

export default function Overview({
  currentProduct,
  currentRating,
  outfit,
  addToMyOutfit,
  removeFromMyOutfit
}) {
  const [announcementNumber, setAnnouncementNumber] = useState(0);
  const [allStyles, setAllStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('-');
  const [outOfStock, setOutOfStock] = useState(false);
  const selectRef = useRef();

  useEffect(() => {
    $('.overViewMainContainer').find('*').addClass('overview');
  }, []);

  useEffect(() => {
    if (Object.keys(currentProduct).length !== 0) {
      getAllStyles(currentProduct.id);
    }
  }, [currentProduct]);

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

          <div className='categoryAndTitleContainer'>
            <CategoryAndTitle
              category={currentProduct.category}
              title={currentProduct.name}
            />
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
                outOfStock={outOfStock}
                setOutOfStock={setOutOfStock}
                selectRef={selectRef}
              />
            </div>

            <div className='quantitySelectorContainer'>
              {(outOfStock === false) && (
                <QuantitySelector
                  selectedStyle={selectedStyle}
                  selectedSize={selectedSize}
                  selectedQuantity={selectedQuantity}
                  setSelectedQuantity={setSelectedQuantity}
                />
              )}
            </div>
          </div>

          <div className='addToCartAndStarContainer'>
            {(outOfStock === false) && (
              <div className='addToCartContainer'>
                <AddToCart
                  selectedSize={selectedSize}
                  selectedQuantity={selectedQuantity}
                  selectRef={selectRef}
                />
              </div>
            )}

            <div className='addToMyOutfitContainer'>
              <AddToMyOutfit
                currentProductId={currentProduct.id}
                outfit={outfit}
                addToMyOutfit={addToMyOutfit}
                removeFromMyOutfit={removeFromMyOutfit}
              />
            </div>
          </div>
        </div>
      </div>

      {(currentProduct.slogan !== '' || currentProduct.description !== '') && (
        <div className='productDescriptionContainer'>
          <ProductDescription
            slogan={currentProduct.slogan}
            description={currentProduct.description}
          />
        </div>
      )}

    </div>
  );
};