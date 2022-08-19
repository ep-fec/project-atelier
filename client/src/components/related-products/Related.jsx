import React from 'react';
import Similar from './Similar.jsx';
import Outfit from './Outfit.jsx';
import axios from 'axios';

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      outfit: []
    };
  }

  componentDidMount() {
    axios.get('/products')
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
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