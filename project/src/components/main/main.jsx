import React, { useState } from 'react';
import CitiCard from '../citi-card/citi-card';
import PropTypes from 'prop-types';
import Map from '../map/map';
import { AppRoute, TypeCard } from '../../const';
import {connect} from 'react-redux';
import CityList from '../city-list/city-list';
import PlacesSort from '../option-sort/option-sort';
import { Link } from 'react-router-dom';
import { logout } from '../../servies/api-actions';

function MainComponent(props) {
  const { cityOffers, logoutProfile } = props;
  const [activeCard, setActiveCard] = useState(null);
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="/#">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    to={AppRoute.LOGIN}
                    onClick ={(evt) => {
                      evt.preventDefault();
                      logoutProfile();
                    }}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <PlacesSort />
              <div className="cities__places-list places__list tabs__content">
                {cityOffers.map((offer) => (
                  <CitiCard
                    key={offer.id}
                    onMouseEnter={() => {
                      setActiveCard(offer.id);
                    }}
                    onMouseLeave={() => setActiveCard(null)} card={offer}
                    typeCard={TypeCard.CITY}
                  />
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map activeCard={activeCard} cardsDescription={cityOffers} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

MainComponent.propTypes = {
  cityOffers: PropTypes.array.isRequired,
  logoutProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cityOffers: state.cityOffers,
});

const mapDispatchToProps = (dispatch) => ({
  logoutProfile() {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

