import React from 'react';
import _ from 'underscore';
import Card from './Card.jsx';

class Outfit extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        products: []
      };
    }

    render() {
      return(<div>
        <h2>YOUR OUTFIT</h2>
        <List products={this.state.products}/>
      </div>)
    }
  }

  let List = (props) => {
    return(<ul className="side-by-side" style={{'--count': props.products.length + 1}} role="outfit-list">
      {_.map(props.products, (product, index) => {
        return (<Card product={product} index={index}/>);
      })}
    </ul>);
  }

export default Outfit;