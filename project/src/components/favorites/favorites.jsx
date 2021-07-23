import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, TypeCard} from '../../const';
import CitiCard from '../citi-card/citi-card';
import {useEffect} from 'react';
import {axiosLoadedFavorites} from '../../servies/api-actions';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthorizationStatus, getFavorites} from '../../store/selectors/selectors';
import SignIn from '../sign-in/sign-in';
import SignOut from '../sign-out/sign-out';
import FavoritesEmpty from '../favorites-empty/favorites-empty';

function FavoritesComponent(props) {
  const dispatch = useDispatch();
  const favorites = useSelector(getFavorites);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(axiosLoadedFavorites());
  }, [dispatch]);


  const groupCities = favorites.reduce((map, favorite) => {
    const favoriteCity = favorite.city.name;
    map.set(favoriteCity, (map.get(favoriteCity) || []).concat([favorite]));
    return map;
  }, new Map());

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.ROOT}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            {authorizationStatus === AuthorizationStatus.AUTH ? <SignOut /> : <SignIn/>}
          </div>
        </div>
      </header>

      {favorites.length ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Array.from(groupCities.entries()).map(([city, favorite]) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={'/#'}>
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favorite.map((currentCard) => (
                        <CitiCard
                          key={currentCard.id}
                          card={currentCard}
                          typeCard={TypeCard.FAVORITE}
                        />
                      ))}
                    </div>
                  </li>))}
              </ul>
            </section>
          </div>
        </main> : <FavoritesEmpty/>}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </a>
      </footer>
    </div>
  );
}


export default FavoritesComponent;

