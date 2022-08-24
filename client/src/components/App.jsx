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
      currentProduct: ''
    };

    this.getInitialProduct = this.getInitialProduct.bind(this);
  }

  componentDidMount() {
    this.getInitialProduct();
  }

  getInitialProduct() {
    axios.get('/initialProduct')
    .then(response => {
      this.setState({currentProduct: response.data});
    })
    .catch(error => {
      console.log('Error getting initial product', error);
    });
  };

  render() {
    return (
      <div>
        <Overview currentProduct={this.state.currentProduct}/>
        <Related />
        <Reviews />
      </div>
    );
  }
}

export default App;
