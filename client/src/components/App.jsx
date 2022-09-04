import React from 'react';
import axios from 'axios';
import Overview from './product-overview/Overview.jsx';
import Reviews from './reviews/Reviews.jsx';
import Related from './related-products/Related.jsx';
import QA from './questions-and-answers/QA.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
<<<<<<< HEAD
      currentProduct: {},
      productId: 0,
      outfit: []
=======
      currentProduct: {id: 71700}
>>>>>>> reviews-main
    };

    this.getInitialProduct = this.getInitialProduct.bind(this);
  }

  componentDidMount() {
    this.getInitialProduct();
  }

  componentDidUpdate(pp, prevState) {
    if (prevState.productId !== this.state.productId && prevState.productId !== 0) {
      axios.get(`/products/${this.state.productId}`)
      .then((response) => {
        this.setState({
          currentProduct: response.data
        });
      })
      .catch((err) => {
        console.log('ERROR GETTING NEW PRODUCT INFO', err);
      })
    }
  }

  getInitialProduct() {
    axios.get('/products?page=3&count=1')
    .then(response => {
      console.log(response.data);
      this.setState({
        currentProduct: response.data[0],
        productId: response.data[0].id
      });
    })
    .catch(error => {
      console.log('Error getting initial product', error);
    });
  };

  changeProduct(productId) {
    this.setState({productId});
  }

  handleAdd() {
    let outfit = this.state.outfit;
    if (!outfit.includes(this.state.productId)) {
      outfit.push(this.state.productId);
      this.setState({outfit: outfit});
    }
  }

  render() {
    return (
      <div>
        <Overview
          currentProduct={this.state.currentProduct}
          currentRating={this.state.currentRating}
        />
        <Related 
          currProduct={this.state.currentProduct}
          changeProduct={this.changeProduct.bind(this)}
          handleAdd={this.handleAdd.bind(this)}
          outfit={this.state.outfit}
        />
        <Reviews currentProduct={this.state.currentProduct}/>
      </div>
    );
  }
}

export default App;
