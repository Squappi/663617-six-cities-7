import React from 'react';
import PropTypes from 'prop-types';

function RatingComponent(props) {
  const {starNumber, userRating, handleChangeRating} = props;
  return(
    <>
      <input className="form__rating-input visually-hidden"
        name="rating"
        value={starNumber}
        id={`${starNumber}-stars`}
        type="radio"
        checked={starNumber === userRating}
        onChange={() => handleChangeRating(starNumber)}
      />
      <label htmlFor={`${starNumber}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </>
  );
}

RatingComponent.propTypes = {
  starNumber: PropTypes.number.isRequired,
  userRating: PropTypes.number.isRequired,
  handleChangeRating :PropTypes.func.isRequired,
};

export default RatingComponent;
