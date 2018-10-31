import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/src/components/App.jsx';
import Tents from '../client/src/components/Tents.jsx';
// import CompareAt




describe('Testing Tests component', () => {
  test('should render correctly with no props', () => {
    const wrapper = shallow(<Tents />); //We use shallow because it only renders the tested component and not any child components like mount does.
    expect(wrapper).toMatchSnapshot();

    // expect(wrapper.exists()).toBe(true);

  });

  test('is initial state correct', () => {
    expect(this.state.currentItem).toEqual(false);
    expect(this.state.tents).toEqual([]);
    expect(this.state.shirts).toEqual([]);
  })
});

