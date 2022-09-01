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
      return(<div class='table'>
        <List products={this.state.products}/>
      </div>)
    }
  }

  let List = (props) => {
    return(<ul className="side-by-side" style={{'--count': props.products.length + 1}}>
      {_.map(props.products, (product, index) => {
        return (<Card product={product} index={index}/>);
      })}
    </ul>);
  }

export default Outfit;