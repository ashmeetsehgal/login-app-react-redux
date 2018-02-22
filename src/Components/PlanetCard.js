import React from 'react';
import PropTypes from 'prop-types';
import Planet from './Planet';
import './planet-card.scss';

const PlanetCard = (props) => {
  const { name, diameter, terrain } = props.planetDetails;
  return (
    <div className='planet-card'>
      <div className='planet-details'>
        <div className='planet-name'> name: {name} </div>
        <div className='planet-data'> Terrain: {terrain} </div>
        <div className='planet-data'> Diameter: {diameter} </div>
      </div>
      <div className='planet-diameter'>
        <Planet diameter={diameter / 500} />
      </div>
    </div>
  );
};

PlanetCard.propTypes = {
  planetDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    diameter: PropTypes.string.isRequired,
    terrain: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlanetCard;
