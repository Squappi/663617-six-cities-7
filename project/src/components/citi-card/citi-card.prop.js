import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  day: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}).isRequired;
