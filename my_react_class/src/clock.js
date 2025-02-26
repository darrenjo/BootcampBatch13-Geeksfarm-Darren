import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Current time:</h1>
        <h2>{this.state.date.toString()}</h2>
      </div>
    );
  }
}

export default Clock;
