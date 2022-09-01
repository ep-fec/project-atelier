import React from 'react';
import _ from 'underscore';
import Card from './Card.jsx';

class Similar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<div class='table'>
      <List products={this.props.products}/>
    </div>)
  }
}

let List = (props) => {
  return(<ul className="side-by-side" style={{'--count': props.products.length}}>
    {_.map(props.products, (product, index) => {
     //console.log('product', index, product);
      return (<Card product={product} index={index}/>);
    })}
  </ul>);
}

export default Similar;