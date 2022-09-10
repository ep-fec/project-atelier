import React from 'react';
import _ from 'underscore';
import Card from './Card.jsx';

class Outfit extends React.Component {
  constructor(props) {
      super(props);

      this.moveRight = this.moveRight.bind(this);
      this.moveLeft = this.moveLeft.bind(this);
    }

  moveRight() {
    this.props.moveRight('outfit');
  }
  moveLeft() {
    this.props.moveLeft('outfit');
  }

    render() {
      return(
      <div>
        <h2>YOUR OUTFIT</h2>
        <ul id='outfit' className='side-by-side' style={{'--count': this.props.outfit.length + 1}} role='outfit-list'>
          <li className='card' onClick={this.props.handleAdd}>Add to your list of outfits</li>
          {_.map(this.props.outfit, (product, index) => {
            return (<Card product={product} index={index}
              changeProduct={this.props.changeProduct}
              actionButton={this.props.removeProduct}
              location ={'outfit'}/>);})}
        </ul>
      </div>)
    }
  }

export default Outfit;