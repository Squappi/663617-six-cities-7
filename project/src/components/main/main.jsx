import React, { useState } from 'react';
import CitiCard from '../citi-card/citi-card';
import PropTypes from 'prop-types';
import Map from '../map/map';
import { AuthorizationStatus, TypeCard } from '../../const';
import {connect} from 'react-redux';
import CityList from '../city-list/city-list';
import PlacesSort from '../option-sort/option-sort';
import { logout } from '../../servies/api-actions';
import SignIn from '../sign-in/sign-in';
import SignOut from '../sign-out/sign-out';
import MainEmptyComponent from '../main-empty/main-empty';
import { Link } from 'react-router-dom';
import { getAuthorizationStatus, getCityOffers } from '../../store/selectors/selectors';

function MainComponent(props) {
  const { cityOffers, authorizationStatus } = props;
  const [activeCard, setActiveCard] = useState(null);
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/#">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            {authorizationStatus === AuthorizationStatus.AUTH ? <SignOut /> : <SignIn/>}
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
        {cityOffers.length ?
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
          : <MainEmptyComponent/>}
      </main>
    </div>
  );
}

MainComponent.propTypes = {
  cityOffers: PropTypes.array.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  cityOffers: getCityOffers(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  logoutProfile() {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

