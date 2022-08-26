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
    this.setState({
      currProduct: this.props.currProduct
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currProduct !== this.props.currProduct) {
      this.setState({
        currProduct: this.props.currProduct
      });
    }
    if (prevState.currProduct !== this.state.currProduct) {
      let id = this.state.currProduct.id;
      axios.get(`/products/${id}/related`)
      .then((result) => {
        this.setState({
          products: result.data
        }, function() {
          //console.log('Related State', this.state);
        });
      })
      .catch((err) => {
        console.log('ERROR GETTING RELATED', err);
      });
    }
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