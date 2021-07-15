import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, TypeCard } from '../../const';
import PropTypes from 'prop-types';
import InsideListComponent from '../inside-list/inside-list';
import Map from '../map/map';
import CitiCard from '../citi-card/citi-card';
import { axiosLoadComments } from '../../servies/api-actions';
import { connect } from 'react-redux';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import FormComponent from '../form-comment/form-comment';
import CommentComponent from '../reviews/reviews';

const MAX_IMAGES = 6;

function PropertyComponent(props) {
  const { card, comments, nearCards, loadComments, authorizationStatus } = props;
  const { type, goods, bedrooms, rating, price, maxAdults, host, description,images, isPremium, isFavorite } = card;
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    loadComments(card);
  },[card]);
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to = {AppRoute.ROOT}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={'/#'}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={'/#'}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0,MAX_IMAGES).map((imageUrl) => (
                <div key={imageUrl} className="property__image-wrapper">
                  <img className="property__image" src={imageUrl} alt={type} />
                </div>))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  Beautiful &amp; luxurious studio at great location
                </h1>
                <button className={`property__bookmark-button button ${isFavorite ? 'property__bookmark-button--active' : ''}`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: rating/ 5 * 100 + '%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">4.8</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((inside, id) => <InsideListComponent key = {id++} inside={inside}/>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro': ''} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    Angelina
                  </span>
                  {host.isPro &&
                  <span className="property__user-status">
                    Pro
                  </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              {authorizationStatus === AuthorizationStatus.AUTH &&
                comments ?
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                  <ul className="reviews__list">
                    {comments.map((reviews) => <CommentComponent key={reviews.id} reviews={reviews}/>)}
                  </ul>
                  <FormComponent card={card} comments={comments}/>
                </section>
                : <LoadingScreen/>}
            </div>
          </div>
          <section className="property__map map">
            <Map activeCard={activeCard} cardsDescription={nearCards} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearCards.map((placeCard) => (
                <CitiCard
                  key={placeCard.id}
                  onMouseEnter={() => {setActiveCard(placeCard.id);
                  }}
                  onMouseLeave={() => setActiveCard(null)}
                  card={placeCard}
                  typeCard={TypeCard.PLACE}
                />))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

PropertyComponent.propTypes = {
  card: PropTypes.object.isRequired,
  comments: PropTypes.array,
  nearCards: PropTypes.array.isRequired,
  loadComments: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  comments: state.listComments,
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  loadComments(card) {
    dispatch(axiosLoadComments(card.id));
  },
});

export {PropertyComponent};
export default connect(mapStateToProps, mapDispatchToProps)(PropertyComponent);
