import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {axiosSendComments} from '../../servies/api-actions';
import RatingComponent from '../rating-component/rating-component';

const STARS_COUNT = 5;
const ratingTitles = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

function FormComponent(props) {
  const {card} = props;

  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(0);

  const dispatch = useDispatch();

  const handleChangeRating = (value) => {
    setUserRating(Number(value));
  };

  return (
    <form className="reviews__form form"
      action="/#"
      method="post"
      onSubmit={((evt)=> {
        evt.preventDefault();
        dispatch(axiosSendComments(card.id, userRating, userComment))
          .then(()=>{
            setUserComment('');
            setUserRating(0);
          });
      })}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating"
        onChange = {(evt) => {
          const ratingValue = evt.target.value;
          setUserRating(Number(ratingValue));
        }}
      >
        {Array.from({length: STARS_COUNT}).map((_, index) => {
          const starNumber = STARS_COUNT - index;
          return (
            <RatingComponent
              key={starNumber}
              starsTitle={ratingTitles[index]}
              starNumber={starNumber}
              userRating={userRating}
              handleChangeRating={handleChangeRating}
            />
          );
        })}
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={userComment}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(evt) => {
          const target = evt.target.value;
          setUserComment(target);
        }}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={(userComment.length <= 50 || userComment.length >= 300) || !userRating}>Submit</button>
      </div>
    </form>
  );
}

FormComponent.propTypes = {
  card: PropTypes.object.isRequired,
};


export default FormComponent;
