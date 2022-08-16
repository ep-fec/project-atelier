import React from 'react';
import Overview from './product-overview/Overview.jsx';
import Reviews from './reviews/Reviews.jsx';
import Related from './related-products/Related.jsx';
import QA from './questions-and-answers/QA.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.getAllProducts = this.getAllProducts.bind(this);
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts() {
    axios({
      method: 'GET',
      url: '/allProducts',
      success: (response) => {
        console.log('Success', response);
      },
      error: (err) => {
        console.log('Error', err);
      }
    })
  }

  render() {
    return (
      <div> Hello World!
        <Overview />
      {/*   <Related />
        <QA />
        <Reviews /> */}
      </div>
    );
  }
}

export default App;
