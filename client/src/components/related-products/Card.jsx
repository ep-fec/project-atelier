import React from 'react';
import axios from 'axios';
import Stars from './Stars.jsx';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      product: {},
      styles: [{photos: ['img']}],
      reviews: 0
    };

    this.changeProduct = this.changeProduct.bind(this);
    this.actionButton = this.actionButton.bind(this);
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
          //console.log('Result:', this.props.product, result.data);
        });
      })
      .catch((err) => {
        console.log('ERROR GETTING RELATED PRODUCT INFO', err);
      });
    }
  }

  changeProduct() {
    this.props.changeProduct(this.state.productId);
  }

  actionButton(e) {
    e.stopPropagation();
    this.props.actionButton(this.state.productId, this.state.product);
  }

  render() {
    let photo = this.state.styles[0].photos[0];
    if (this.props.location === 'similar') {
      return(
        <li className='card' onClick={this.changeProduct}>
          <i className="fa-regular fa-star" onClick={this.actionButton}></i>
          <img src={photo.thumbnail_url}/>
          <p>{this.state.product?.category}</p>
          <p>{this.state.product?.name}</p>
          <p>{this.state.product?.default_price}</p>
          <Stars reviews={this.state.reviews}/>
        </li>);
    } else if (this.props.location === 'outfit') {
      return(
        <li className='card' onClick={this.changeProduct}>
          <i className="fa-solid fa-x" onClick={this.actionButton}></i>
          <img src={photo.thumbnail_url}/>
          <p>{this.state.product?.category}</p>
          <p>{this.state.product?.name}</p>
          <p>{this.state.product?.default_price}</p>
          <Stars reviews={this.state.reviews}/>
        </li>);
    }
  }
}

export default Card;