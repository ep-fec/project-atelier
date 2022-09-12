import React from 'react';
import Overview from './product-overview/Overview.jsx';
import BaseReviews from './reviews/Reviews.jsx';
import Related from './related-products/Related.jsx';
import withLogger from './Logger.jsx';

const Reviews = withLogger(BaseReviews);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: {id: 71700}
    };
  }


  render() {
    return (
      <div>
        {/* <Overview />
        <Related />
        <QA /> */}
        <Reviews currentProduct={this.state.currentProduct} widget={'Ratings & Reviews'}/>
      </div>
    );
  }
}


export default App;
