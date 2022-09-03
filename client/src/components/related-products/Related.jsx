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
      <Similar products={this.state.products}
        changeProduct={this.props.changeProduct}/>
      <Outfit outfit={this.props.outfit} handleAdd={this.props.handleAdd}
        changeProduct={this.props.changeProduct}/>
      <br></br>
    </div>);
  }
}

export default Related;