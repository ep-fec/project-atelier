import React from 'react';

const withLogger = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseClick = this.handleMouseClick.bind(this);
      this.state = {
        element: '',
        widget: props.widget,
        time: '',
      }
    }

  handleMouseClick(e) {
    console.log(e.target.outerHTML)
    let date = new Date();
    let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    let element = e.target.outerHTML;
    this.setState({
      element,
      time
    });

  };

  render() {
    return (
      <div onClick={(e) => this.handleMouseClick(e)}>
        <WrappedComponent {...this.props}/>
      </div>
    );
  };
};
}
export default withLogger;

/*
The click tracking will not be through any 3rd party analytics platform. All will be done in-house. To track interactions, each click on the web page should be recorded, as well as metadata associated with that click.

For each click on the page, we need to capture the following:

Element of the page which was clicked
Time of click
Module clicke

*/