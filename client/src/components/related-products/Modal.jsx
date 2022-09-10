import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Get the list of features and which products have which features
    let [features, left, right] = [[], [], []];
    if (this.props.currProduct.features) {
      let currFeatures = this.props.currProduct.features;
      for (let i = 0; i < currFeatures.length; i++) {
        let currFeature = `${currFeatures[i].feature}: ${currFeatures[i].value}`;
        let index = features.indexOf(currFeature);
        if (index === -1) {
          features.push(currFeature);
          left[features.length - 1] = true;
        } else {
          left[index] = true;
        }
      }
    }
    if (this.props.comparisonProduct.features) {
      let compFeatures = this.props.comparisonProduct.features;
      for (let i = 0; i < compFeatures.length; i++) {
        let compFeature = `${compFeatures[i].feature}: ${compFeatures[i].value}`;
        let index = features.indexOf(compFeature);
        if (index === -1) {
          features.push(compFeature);
          right[features.length - 1] = true;
        } else {
          right[index] = true;
        }
      }
    }
    // Render the table with the features found above
    return (
    <div className='modal'>
      <div className='overlay' onClick={this.props.close}>
        <div className='modal-content'>
          <table>
            <thead className='scroll-thead'>
              <tr>
                <th>{this.props.currProduct.name}</th>
                <th></th>
                <th>{this.props.comparisonProduct.name}</th>
              </tr>
            </thead>
            <tbody className='scroll-tbody-y table-body'>
            {features.map((feature, index) => {
              return (
                <tr>
                  <td>{left[index] ? <p>check</p> : null}</td>
                  <td>{feature}</td>
                  <td>{right[index] ? <p>check</p> : null}</td>
                </tr>);
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
  }
}

export default Modal;