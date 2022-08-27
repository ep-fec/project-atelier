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
    return(<div className='overViewMainContainer related-container'>
      <h2>Related Products</h2>
      <Similar products={this.state.products}/>
      <h4>Your Outfit</h4>
      <Outfit outfit={this.state.outfit}/>
      <br></br>
    </div>);
  }
}

export default Related;