import React from 'react';
import _ from 'underscore';
import Card from './Card.jsx';

class Similar extends React.Component {
  constructor(props) {
    super(props);

    this.moveRight = this.moveRight.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
  }

  moveRight() {
    this.props.moveRight('similar');
  }
  moveLeft() {
    this.props.moveLeft('similar');
  }

  render() {
    return(
    <div>
      <h2 className="reviews-logo">RELATED PRODUCTS</h2>
      <ul id='similar' className='side-by-side' style={{'--count': this.props.products.length}} role='related-list'>
        {_.map(this.props.products, (product, index) => {
        //console.log('product', index, product);
          return (<Card product={product} index={index}
            changeProduct={this.props.changeProduct}
            actionButton={this.props.compare}
            location={'similar'}/>);
        })}
      </ul>
     </div>)
  }
}

export default Similar;