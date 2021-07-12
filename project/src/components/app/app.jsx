import React from 'react';
import MainComponent from '../main/main';
import PropTypes from 'prop-types';
import { AppRoute } from '../../const';
import FavoritesComponent from '../favorites/favorites';
import LoginComponent from '../login/login';
import {Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import PropertyComponent from '../property/property';
import NotFound from '../render/render';
import {connect} from 'react-redux';
import { isCheckedAuth } from '../../store/action';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../browser-history/browser-history';


function App(props) {
  const { offers, comments, authorizationStatus, isDataLoaded } = props;

  if (!isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainComponent cardsDescription = {offers} authorizationStatus={authorizationStatus}/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() =>
            <FavoritesComponent cardsDescription = {offers} />}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.LOGIN}>
          <LoginComponent authorizationStatus={authorizationStatus}/>
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
  isDataLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.listOffers,
  authorizationStatus: state.authorizationStatus,
  isDataLoaded: state.isDataLoaded,
  comments: state.listComments,
});

export default connect(mapStateToProps, null)(App);

