import React from 'react';
import _ from 'underscore';
import Card from './Card.jsx';

class Similar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<div>
      <h3>Similar Products</h3>
      <List products={this.props.products}/>
    </div>)
  }
}

let List = (props) => {
  return(<ul className="side-by-side">
    {_.map(props.products, (product) => {
      return (<Card product={product}/>);
    })}
  </ul>);
}

export default Similar;