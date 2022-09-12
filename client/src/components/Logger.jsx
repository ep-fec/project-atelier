import React from 'react';
import axios from 'axios';

const withLogger = (WrappedComponent) => {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          element: '',
          widget: props.widget,
          time: '',
        }
        this.handleMouseClick = this.handleMouseClick.bind(this);
        this.sendInteraction = this.sendInteraction.bind(this);
      }

    handleMouseClick(e) {
      let date = new Date();
      let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      let element = e.target.outerHTML;
      this.setState({
        element,
        time
      });
      this.sendInteraction();
    };

    sendInteraction(e) {
      let element = this.state.element;
      let widget = this.state.widget;
      let time = this.state.time;

      axios.post('/interactions', {element, widget, time})
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

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