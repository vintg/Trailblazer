import React from 'react';
import PeopleAlsoViewed from './peopleAlsoViewed.jsx';
import CompareAtGlance from './compareAtGlance.jsx';
import Tents from './Tents.jsx';
import Shirts from './Shirts.jsx';
import 'unfetch/polyfill'; //This is required for jest tests. Node does not understand the fetch method until you download npm unfetch.

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentItem: false,
      tents: false,
      shirts: false
    };

    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    const url = window.location.href.split('/');
    const id = +url[url.length - 1];
    if(!isNaN(id) && id !== 0 && id < 103) {
      this.getCurrentItem(this.updateState, id);
    }

    this.getTentData(this.updateState);
    this.getShirtData(this.updateState);
  }

  getCurrentItem(cb, id) {
    fetch(`http://localhost:3004/product/data/${id}`)
    .then(res => res.json())
    .then(data => cb('currentItem', data))
    .catch(error => console.error(error))
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
    let current = this.state.currentItem;
    let display;
    if (current) {
      if (current[0].productType === 'Tent') {
        display = <Tents tents={this.state.tents} current={this.state.currentItem} />;
      } else {
        display = <Shirts shirts={this.state.shirts} />;
      }
    } else {
      display = <Shirts shirts={this.state.shirts} />;
    }

    return (
      !this.state.tents || !this.state.shirts
      ? <div className='centered'>Loading...:D</div>
      :
      <div>
        {display}
      </div>
    )
  }
}