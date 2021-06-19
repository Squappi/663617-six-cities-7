import React from 'react';
import PropTypes from 'prop-types';

function InsideListComponent(props) {
  const { inside } = props;
  return (
    <li className="property__inside-item">
      {inside}
    </li>
  );
}

InsideListComponent.propTypes = {
  inside: PropTypes.string.isRequired,
};

export default InsideListComponent;
