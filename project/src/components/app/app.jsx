import React from 'react';
import MainComponent from '../main/main';
import PropTypes from 'prop-types';
import { AppRoute } from '../../const';
import FavoritesComponent from '../favorites/favorites';
import LoginComponent from '../login/login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropertyComponent from '../property/property';
import NotFound from '../render/render';

function App(props) {
  const { cardsDescription, comments } = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainComponent cardsDescription = {cardsDescription}/>
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <FavoritesComponent cardsDescription = {cardsDescription}/>
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <LoginComponent />
        </Route>
        <Route exact path={AppRoute.ROOM} render={(routeProps) => {
          const card = cardsDescription.find((item) => item.id === Number(routeProps.match.params.id));
          return <PropertyComponent card={card} comments = {comments}/>;
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
  cardsDescription: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
};

export default App;
