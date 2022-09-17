import React from 'react';
import Similar from './Similar.jsx';
import Outfit from './Outfit.jsx';
import axios from 'axios';
import Modal from './Modal.jsx';

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProduct: {},
      products: [],
      comparisonModal: false,
      comparisonProduct: {}
    };

    this.openCompare = this.openCompare.bind(this);
    this.closeCompare = this.closeCompare.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
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
    if (prevState.comparisonModal !== this.state.comparisonModal) {
      if (this.state.comparisonModal) {
        document.querySelector('body').style.overflowY = 'hidden';
      } else {
        document.querySelector('body').style.overflowY = 'auto';
      }
    }
  }

  openCompare(id, prodInfo) {
    this.setState({
      comparisonModal: true,
      comparisonProduct: prodInfo
    });
  }

  closeCompare() {
    this.setState({
      comparisonModal: false
    });
  }

  moveRight(name) {
    document.getElementsById(name).scrollLeft += 20;
  }

  moveLeft(name) {
    document.getElementsById(name).scrollLeft -= 20;

  }

  render() {
    return(<div className='overViewMainContainer related-container'>
      {this.state.comparisonModal ?
        <Modal close={this.closeCompare} currProduct={this.state.currProduct}
          comparisonProduct={this.state.comparisonProduct}/> :
        null}
      <Similar products={this.state.products}
        changeProduct={this.props.changeProduct}
        compare={this.openCompare}
        moveRight={this.moveRight}
        moveLeft={this.moveLeft}/>
      <Outfit outfit={this.props.outfit} handleAdd={this.props.handleAdd}
        changeProduct={this.props.changeProduct}
        removeProduct={this.props.removeProduct}
        moveRight={this.moveRight}
        moveLeft={this.moveLeft}/>
      <br></br>
    </div>);
  }
}

export default Related;