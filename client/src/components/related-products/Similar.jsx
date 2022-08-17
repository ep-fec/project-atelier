import React from 'react';
import _ from 'underscore';

class Similar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    return(<div>
      <h3>Similar Products</h3>
      <List products={this.state.products}/>
    </div>)
  }
}

let List = (props) => {
  return(<ul>
    {_.map(props.products, (product) => {
      return (<Element product={product}/>);
    })}
  </ul>);
}

class Element extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<li>this.props.product</li>)
  }
}

export default Similar;