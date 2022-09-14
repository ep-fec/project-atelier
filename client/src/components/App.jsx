import React from 'react';
import axios from 'axios';
import BaseOverview from './product-overview/Overview.jsx';
import BaseReviews from './reviews/Reviews.jsx';
import BaseRelated from './related-products/Related.jsx';
import withLogger from './Logger.jsx';

const Reviews = withLogger(BaseReviews);
const Related = withLogger(BaseRelated);
const Overview = withLogger(BaseOverview);

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
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
    this.handleGetId = this.handleGetId.bind(this);
  }

  componentDidMount() {
    let url = window.location.pathname.split('/');
    if (url.length === 3) {
      let productId = Number(url[2]);
      this.handleGetId(productId);
    } else {
      this.getInitialProduct();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.productId !== this.state.productId && prevState.productId !== 0) {
      axios.get(`/products/${this.state.productId}`)
      .then((response) => {
        this.setState({
          currentProduct: response.data
        });
        history.pushState(null , '', `/productid/${this.state.productId}`);
      })
      .catch((err) => {
        console.log('ERROR GETTING NEW PRODUCT INFO', err);
      })
    }
  }

    handleGetId(id) {
      return axios.get(`/products/${id}`)
        .then(response => {
          this.setState({
            currentProduct: response.data,
            productId: response.data.id
          });
        })
        .catch(error => {
          console.log('Error getting initial product', error);
        });
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
          widget={'Product Overview'}
        />
        <Related
          currProduct={this.state.currentProduct}
          changeProduct={this.changeProduct}
          handleAdd={this.addToMyOutfit}
          outfit={this.state.outfit}
          removeProduct={this.removeFromOutfit}
          widget={'Related Products'}
          />
        <Reviews
          currentProduct={this.state.currentProduct}
          widget={'Ratings & Reviews'}
        />
      </div>);
  }
}


export default App;
