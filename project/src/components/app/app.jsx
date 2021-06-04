import React from 'react';
import MainComponent from '../main/main';
import PropTypes from 'prop-types';

function App(props) {
  const { cards } = props;
  return <MainComponent cards = {cards} />;
}

App.propTypes = {
  cards: PropTypes.number.isRequired,
};

export default App;
