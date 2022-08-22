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
        <h3>My Outfit</h3>
        <List products={this.state.products}/>
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

export default Outfit;