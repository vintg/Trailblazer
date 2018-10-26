import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
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