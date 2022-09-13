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
    };

    componentDidUpdate(prevProps, prevState) {
      if (this.state.element !== '' ) {
        this.sendInteraction();
      }
    }

    sendInteraction(e) {
      let element = this.state.element;
      let widget = this.state.widget;
      let time = this.state.time;
      console.log({ element, widget, time });

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