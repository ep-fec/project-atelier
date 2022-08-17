import React from 'react';
import Similar from './Similar.jsx';
import Outfit from './Outfit.jsx';

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      outfit: []
    };
  }

  componentDidMount() {
    //Make an api call to grab a product's info
  }

  render() {
    return(<div>
      <h1>Related Products</h1>
      <Similar products={this.state.products}/>
      <Outfit outfit={this.state.outfit}/>
    </div>);
  }
}

export default Related;