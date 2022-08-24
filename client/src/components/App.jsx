import React from 'react';
import axios from 'axios';
import Overview from './product-overview/Overview.jsx';
import Reviews from './reviews/Reviews.jsx';
import Related from './related-products/Related.jsx';
import QA from './questions-and-answers/QA.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: 71700
    };
  }

  render() {
    return (
      <div>
        <Overview />
        <Related />
        <Reviews /> 
      </div>
    );
  }
}

export default App;
