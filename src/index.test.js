import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/src/components/App.jsx'

describe('Jest and Enzyme tests should be working', () => {

  test('Make sure Jest is working', () => {
    expect(true).toBe(true);
  });

  test('Make sure Enzyme method mount is working', () => {
    const divTest = <div>hello</div>;
    const answer = mount(divTest);
    expect(answer.text()).toBe('hello');
  });

})

describe('Testing App Component', () => {

  test('Should have a render function', () => {
    const wrapper = shallow(<App />); //We use shallow because it only renders the tested component and not any child components like mount does.
    expect(wrapper.exists()).toBe(true);
  });
});
