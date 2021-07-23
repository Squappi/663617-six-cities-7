import React from 'react';
import MainComponent from '../main/main';
import {AppRoute} from '../../const';
import FavoritesComponent from '../favorites/favorites';
import LoginComponent from '../login/login';
import {Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import PropertyComponent from '../property/property';
import NotFound from '../render/render';
import {useSelector} from 'react-redux';
import {isCheckedAuth} from '../../store/action';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../browser-history/browser-history';
import {getAuthorizationStatus, getDataLoaded, getOffers} from '../../store/selectors/selectors';


function App(props) {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getDataLoaded);
  const offers = useSelector(getOffers);

  if (!isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainComponent cardsDescription = {offers}/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() =>
            <FavoritesComponent />}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.LOGIN}>
          <LoginComponent/>
        </Route>
        <Route exact path={AppRoute.ROOM} render={(routeProps) => {
          const card = offers.find((item) => item.id === Number(routeProps.match.params.id));
          return <PropertyComponent card={card} nearCards={offers.slice(0, 3)}/>;
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


export default App;

