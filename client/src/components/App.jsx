import React from 'react';
import axios from 'axios';
import Overview from './product-overview/Overview.jsx';
import Reviews from './reviews/Reviews.jsx';
import Related from './related-products/Related.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: {},
      productId: 0,
      outfit: []
    };

    this.getInitialProduct = this.getInitialProduct.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
    this.addToMyOutfit = this.addToMyOutfit.bind(this);
    this.removeFromMyOutfit = this.removeFromMyOutfit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
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
    return axios.get('/products?page=3&count=1')
      .then(response => {
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

  addToMyOutfit() {
    let outfit = this.state.outfit;
    if (!outfit.includes(this.state.productId)) {
      outfit.push(this.state.productId);
      this.setState({outfit: outfit});
    }
  }

  removeFromMyOutfit() {
    let outfit = this.state.outfit;
    let indexToRemove = outfit.indexOf(this.state.productId);
    if (indexToRemove !== -1) {
      outfit.splice(indexToRemove, 1);
    }
    this.setState({outfit: outfit});
  }

  removeFromOutfit(id) {
    let outfit = this.state.outfit;
    let index = outfit.indexOf(id);
    outfit.splice(index, 1);
    this.setState({outfit});
  }

  render() {
    return (
      <div>
        <Overview
          currentProduct={this.state.currentProduct}
          currentRating={this.state.currentRating}
          outfit={this.state.outfit}
          addToMyOutfit={this.addToMyOutfit}
          removeFromMyOutfit={this.removeFromMyOutfit}
        />
        <Related currProduct={this.state.currentProduct}
          changeProduct={this.changeProduct}
          handleAdd={this.handleAdd}
          outfit={this.state.outfit}
          removeProduct={this.removeFromOutfit}/>
        <Reviews currentProduct={this.state.currentProduct}/>
      </div>);
  }
}

export default App;
