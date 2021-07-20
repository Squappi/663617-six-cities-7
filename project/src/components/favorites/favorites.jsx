import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppRoute, TypeCard } from '../../const';
import CitiCard from '../citi-card/citi-card';
import { useEffect } from 'react';
import { axiosLoadedFavorites } from '../../servies/api-actions';
import { connect } from 'react-redux';
import { getAuthorizationStatus, getFavorites } from '../../store/selectors/selectors';

function FavoritesComponent(props) {
  const { favorites, loadFavorites } = props;

  useEffect(() => {
    loadFavorites();
  },[loadFavorites]);

  // const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

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
                  <Link className="header__nav-link header__nav-link--profile"  to = {'/#'}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link"  to = {'/#'}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to = {'/#'}>
                      <span>Amsterdam</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {favorites.map((currentCard) =>(
                    <CitiCard
                      key = {currentCard.id}
                      card = {currentCard}
                      typeCard={TypeCard.FAVORITE}
                    />
                  ))}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </a>
      </footer>
    </div>
  );
}

FavoritesComponent.propTypes = {
  favorites: PropTypes.array.isRequired,
  loadFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites() {
    dispatch(axiosLoadedFavorites());
  },
});

export  {FavoritesComponent};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);

