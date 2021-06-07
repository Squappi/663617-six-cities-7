import React, { Fragment } from 'react';
import MainComponent from '../main/main';
import PropTypes from 'prop-types';
import { AppRoute } from '../../const';
import FavoritesComponent from '../favorites/favorites';
import LoginComponent from '../login/login';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import PropertyComponent from '../property/property';

function App(props) {
  const { cardsCount } = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainComponent cardsCount = {cardsCount} />
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <FavoritesComponent />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <LoginComponent />
        </Route>
        <Route exact path={AppRoute.DEV_ROOM}>
          <PropertyComponent />
        </Route>
        <Route
          render ={() => (
            <Fragment>
              <h1>
                404.
                <small>Page not found</small>
              </h1>
              <Link to="/">Go to main page</Link>
            </Fragment>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  cardsCount: PropTypes.number.isRequired,
};

export default App;
