import React from 'react';
import cardsDescriptionProp from '../citi-card/citi-card.prop';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

function CitiCard(props) {
  const { card } = props;
  const { type, src, price, day, rating, description} = card;
  return (
    <article className="cities__place-card place-card">
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to = {AppRoute.ROOM}>
          <img className="place-card__image" src={src} width={260} height={200} alt="Place pic" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;{day}</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: rating}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to = {'/#'}>{description}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

CitiCard.propTypes = {
  card: cardsDescriptionProp,
};

export default CitiCard;
