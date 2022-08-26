import React from 'react';
import axios from 'axios';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      product: {},
      styles: ['failed'],
      reviews: {}
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
        //console.log('Result', result.data);
        this.setState({
          product: result.data.product,
          styles: result.data.styles,
          reviews: result.data.reviews
        });
      })
      .catch((err) => {
        console.log('ERROR GETTING RELATED PRODUCT INFO');
      });
      // this.setState({
      //   styles: ['worked']
      // }, function() {
      //   console.log('Card state', this.state);
      // });
    }
  }

  render() {
    return(<li>
      <p>{this.state.product.category}</p>
      <p>{this.state.product.name}</p>
      <p>{this.state.product.default_price}</p>
      <p>Star rating</p>
      </li>);
  }
}

export default Card;