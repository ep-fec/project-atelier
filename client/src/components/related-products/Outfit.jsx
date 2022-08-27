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
    return(<ul className="side-by-side">
      {_.map(props.products, (product) => {
        return (<Card product={product}/>);
      })}
    </ul>);
  }

export default Outfit;