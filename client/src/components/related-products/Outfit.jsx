import React from 'react';
import _ from 'underscore';
import Card from './Card.jsx';

class Outfit extends React.Component {
  constructor(props) {
      super(props);
    }

    render() {
      return(<div>
        <h2>YOUR OUTFIT</h2>
        <List products={this.props.outfit} handleAdd={this.props.handleAdd}
          changeProduct={this.props.changeProduct}/>
      </div>)
    }
  }

  let List = (props) => {
    return(<ul className="side-by-side" style={{'--count': props.products.length + 1}} role="outfit-list">
      <li className="card" onClick={props.handleAdd}>Add to your list of outfits</li>
      {_.map(props.products, (product, index) => {
        return (<Card product={product} index={index}
          changeProduct={props.changeProduct}/>);
      })}
    </ul>);
  }

export default Outfit;