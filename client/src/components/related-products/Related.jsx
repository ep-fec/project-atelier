import React from 'react';
import Similar from './Similar.jsx';
import Outfit from './Outfit.jsx';
import axios from 'axios';

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProduct: {},
      products: [],
      outfit: []
    };
  }

  componentDidMount() {
    axios.get('/products')
    .then((result) => {
      console.log(result.data);
      this.setState({
        currProduct: result.data[0]
      }, function() {
        let id = this.state.currProduct.id;
        axios.get(`/related/${id}`)
        .then((result) => {
          this.setState({
            products: result.data
          });
        })
        .catch((err) => {
          console.log('ERROR GETTING RELATED', err);
        });
      });
    })
    .catch((err) => {
      console.log('ERROR GETTING PRODUCTS',err);
    });
  }

  render() {
    return(<div>
      <h3>Related Products</h3>
      <Similar products={this.state.products}/>
      <h3>Your Outfit</h3>
      <Outfit outfit={this.state.outfit}/>
    </div>);
  }
}

export default Related;