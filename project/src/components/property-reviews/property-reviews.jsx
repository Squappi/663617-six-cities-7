import PropTypes from 'prop-types';
import React from 'react';
import FormComponent from '../form-comment/form-comment';
import CommentComponent from '../reviews/reviews';

function PropertyReviews(props) {
  const { comments } = props;
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {comments.map((reviews) => <CommentComponent key={reviews.id} reviews={reviews}/>)}
      </ul>
      <FormComponent />
    </section>
  );
}

PropertyReviews.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default PropertyReviews;
