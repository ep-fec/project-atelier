import React from 'react';
import axios from 'axios';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      product: {},
      styles: [{photos: ['img']}],
      reviews: 0
    };
  }

  componentDidMount() {
    this.setState({
      productId: this.props.product
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.product !== this.props.product) {
      //console.log('product', this.props.product);
      this.setState({
        productId: this.props.product,
      });
    }
    if (prevState.productId !== this.state.productId) {
      axios.get(`/related/${this.state.productId}`)
      .then((result) => {
        this.setState({
          product: result.data.product,
          styles: result.data.styles,
          reviews: result.data.reviewScore
        }, function() {
         // console.log('Result:', this.props.product, result.data);
        });
      })
      .catch((err) => {
        console.log('ERROR GETTING RELATED PRODUCT INFO', err);
      });
    }
  }

  render() {
    let photo = this.state.styles[0].photos[0];
    return(<li className='card'>
      <img
        src={photo.thumbnail_url}/>
      <p>{this.state.product.category}</p>
      <p>{this.state.product.name}</p>
      <p>{this.state.product.default_price}</p>
      <p>{this.state.reviews} out of 5 stars</p>
      </li>);
  }
}

export default Card;