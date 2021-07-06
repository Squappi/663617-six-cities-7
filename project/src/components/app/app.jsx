import React from 'react';
import MainComponent from '../main/main';
import PropTypes from 'prop-types';
import { AppRoute } from '../../const';
import FavoritesComponent from '../favorites/favorites';
import LoginComponent from '../login/login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropertyComponent from '../property/property';
import NotFound from '../render/render';
import {connect} from 'react-redux';
import { isCheckedAuth } from '../../store/action';
import LoadingScreen from '../loadingScreen/LoadingScreen';

function App(props) {
  const { offers, comments, authorizationStatus, isDataLoader } = props;

  if (isCheckedAuth(authorizationStatus) || isDataLoader) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainComponent cardsDescription = {offers}/>
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <FavoritesComponent cardsDescription = {offers}/>
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <LoginComponent />
        </Route>
        <Route exact path={AppRoute.ROOM} render={(routeProps) => {
          const card = offers.find((item) => item.id === Number(routeProps.match.params.id));
          return <PropertyComponent card={card} nearCards={offers.slice(0, 3)} comments = {comments}/>;
        }}
        >
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  isDataLoader: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.listOffers,
  authorizationStatus: state.authorizationStatus,
  isDataLoader: state.isDataLoader,
});

export default connect(mapStateToProps, null)(App);

