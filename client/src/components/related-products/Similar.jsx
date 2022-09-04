import React from 'react';
import _ from 'underscore';
import Card from './Card.jsx';

class Similar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<div>
      <h2>RELATED PRODUCTS</h2>
      <List products={this.props.products} changeProduct={this.props.changeProduct}/>
    </div>)
  }
}

let List = (props) => {
  return(<ul className="side-by-side" style={{'--count': props.products.length}} role="related-list">
    {_.map(props.products, (product, index) => {
     //console.log('product', index, product);
      return (<Card product={product} index={index}
        changeProduct={props.changeProduct}/>);
    })}
  </ul>);
}

export default Similar;