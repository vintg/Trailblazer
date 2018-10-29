import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tents: [],
      shirts: []
    };

    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.getTentData(this.updateState);
    this.getShirtData(this.updateState);
  }

  getTentData(cb) {
    fetch('http://localhost:3004/data/tents')
    .then(res => res.json())
    .then(data => cb('tents', data))
    .catch(error => console.error(error))
  }

  getShirtData(cb) {
    fetch('http://localhost:3004/data/shirts')
    .then(res => res.json())
    .then(data => cb('shirts', data))
    .catch(error => console.error(error))
  }

  updateState(prop, value) {
    this.setState({
      [prop]: value
    })
  }

  render () {
    return (
      <div>
        <h1>Hello World</h1>
        <img src='https://s3-us-west-2.amazonaws.com/fec-project/shirts/S1.jpg'></img>
        <img src='https://source.unsplash.com/200x200/?tent'></img>
        <img src='https://s3-us-west-2.amazonaws.com/fec-project/tents/1.jpg'></img>
        <img src='https://s3-us-west-2.amazonaws.com/fec-project/tents/10.jpg'></img>
      </div>
    )
  }
}