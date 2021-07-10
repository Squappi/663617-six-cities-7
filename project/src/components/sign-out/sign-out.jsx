import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { logout } from '../../servies/api-actions';
import SignIn from '../sign-in/sign-in';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function SignOut(props) {
  const {logOut} = props;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile" href="#">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            to="/#"
            onClick={(evt) => {
              evt.preventDefault();
              logOut();
            }}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

SignIn.propTypes = {
  logOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logOut() {
    dispatch(logout);
  },
});

export {SignOut};

export default connect(null, mapDispatchToProps)(SignIn);
