import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const PlanetCard = (props) => {
  const { name, diameter, terrain } = props.planetDetails;
  return (
    <Fragment>
      <div> name: {name} </div>
      <div> Diameter: {diameter} </div>
      <div> Terrain: {terrain} </div>
    </Fragment>
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
