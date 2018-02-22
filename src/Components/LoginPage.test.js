import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import LoginPage from './LoginPage'

const wrapper = shallow(<LoginPage />)

describe('Component: Login Page', () => {
  it('rendering', () => {
    expect(shallow(<LoginPage />).length).toEqual(1);
  });
});
