import React from 'react'
import expect from 'expect'
import { assert } from 'chai';
import { shallow, mount } from 'enzyme'
import PlanetCard from './PlanetCard'

const PLANET_PROPS = {
  planetDetails: {
      name:'abc','diameter':1000,terrain:'terrain'
  }
};

describe('Component: Planet Card', () => {
  it('rendering', () => {
    expect(shallow(<PlanetCard {...PLANET_PROPS} />).length).toEqual(1);
  });
});

describe('Component: Planet Card', () => {
  let planetcard = mount(
      <PlanetCard {...PLANET_PROPS} />
    );
  it('should contain planet-card', () => {
    expect(planetcard.find('.planet-card').hasClass('planet-card')).toBe(true);
    expect(planetcard.find('.planet-details').hasClass('planet-details')).toBe(true);
    expect(planetcard.find('.planet-name').hasClass('planet-name')).toBe(true);
    expect(planetcard.find('.planet-diameter').hasClass('planet-diameter')).toBe(true);
    const data=planetcard.find('.planet-data');
    assert.equal(data.length,2)
  });
});

