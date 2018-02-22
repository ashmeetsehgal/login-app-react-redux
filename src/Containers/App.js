import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchPage from '../Components/SearchPage';
import LoginPage from '../Components/LoginPage';

const App = (props) => {
  const { isUserLoggedIn } = props;
  return (
    <Fragment>
      {isUserLoggedIn ? <SearchPage /> : <LoginPage />}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isUserLoggedIn: state.loginReducer.isUserLoggedIn,
});

export default connect(mapStateToProps)(App);

App.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
};
