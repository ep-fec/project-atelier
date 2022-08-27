import React from 'react';
import axios from 'axios';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      product: {}
    };
  }

  componentDidMount() {
    this.setState({
      productId: this.props.product
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.product !== this.props.product) {
      this.setState({
        productId: this.props.product
      });
    }
    if (prevState.productId !== this.state.productId) {
      axios.get(`/products/${this.state.productId}`)
      .then((result) => {
        this.setState({
          product: result.data
        });
      })
      .catch((err) => {
        console.log('ERROR GETTING PRODUCT INFO IN CARD', err);
      });
    }
  }

  render() {
    console.log(this.state.product);
    return(<li>
      <p>{this.state.product.category}</p>
      <p>{this.state.product.name}</p>
      <p>{this.state.product.default_price}</p>
      <p>Star rating</p>
      </li>);
  }
}

export default Card;