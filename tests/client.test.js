import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/src/components/App.jsx';
import Tents from '../client/src/components/Tents.jsx';
import { findByText } from './setupTests.js'; //this method was imported from Andrew react TDD
// import CompareAt



describe('Testing Tests component', () => {
  test('should render and display code in the jest test with .debug()', () => {
    const w = mount(<Tents tents={[]} current={[]}/>)
    const compareCompProps = w.find('CompareAtGlance').props();
    const peopleCompProps = w.find('[data-test="dt-comp-people"]'); //This is a method to find a component or item. You would assign the data-test as an attribute to the tag/component on the front end then reference it here. Useful if you had multiple similar tags like buttons to select the correct one.
    expect(Object.keys(compareCompProps).length).toEqual(2)
    expect(peopleCompProps.exists()).toEqual(true)
  });

  test('findByText methods works', () => {
    const w = shallow(<Tents tents={[]} current={[]}/>)
    let text = findByText('glance', w).text();
    expect(text).toEqual('Compare at a glance')
  })

  test('proper state values', () => {
    const w = shallow(<App />)
    console.log(w.debug())
    console.log('HELLLOOO')
    console.log('State', w.state())
  })//Keep running into the following error "ReferenceError: fetch is not defined"
});

