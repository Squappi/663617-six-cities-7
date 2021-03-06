import React from 'react';
import commentProp from './reviews.prop';
import dayjs from 'dayjs';

function commentDate(date) {
  return `${dayjs(date).format('MMMM YYYY')}`;
}

function CommentComponent(props) {
  const { reviews } = props;
  const { rating, comment, user, date} = reviews;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating/ 5 * 100  }%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{commentDate(date)}</time>
      </div>
    </li>
  );
}

CommentComponent.propTypes = {
  reviews: commentProp,
};

export default CommentComponent;
