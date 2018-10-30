import React from 'react';
import PeopleAlsoViewed from './peopleAlsoViewed.jsx'
import CompareAtGlance from './compareAtGlance.jsx'


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tents: [{
        "_id": 11,
        "imageURL": "https://s3-us-west-2.amazonaws.com/fec-project/tents/11.jpg",
        "title": "Blue Ridge Hut Tent",
        "ranking": 1,
        "reviews": 6,
        "price": 165,
        "sleepingCapacity": "8+ people",
        "packagedWeight": "24 lbs. 9 oz.",
        "numberOfDoors": 2,
        "bestUse": "Camping",
        "__v": 0
    }],
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
        <div className='container'>
          <div className='titleContainer'>
            <h3>People also viewed</h3>
          </div>
          <div className='pplViewedContainer'>
            {this.state.shirts.slice(0, 4).map((shirt) => (
              <PeopleAlsoViewed key={shirt._id} item={shirt} />
            ))}
          </div>
        </div>
        <div className='container'>
          <div className='titleContainer'>
            <h3>People also viewed</h3>
          </div>
          <div className='pplViewedContainer'>
            {this.state.tents.slice(0, 4).map((item) => (
              <PeopleAlsoViewed key={item._id} item={item} />
            ))}
          </div>
        </div>
        <div className='container'>
          <div className='titleContainer'>
            <h3>Compare at a glance</h3>
          </div>
          <div className='compare-at-glance__container'>
            <div className='compare-at-glance__current'>
              <CompareAtGlance linkText={'Buy Now'} item={this.state.tents[0]} />
            </div>
            <div className='compare-at-glance__suggestions'>
              {this.state.tents.slice(1).map((item) => (
                <CompareAtGlance linkText={'View Now'} key={item._id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}