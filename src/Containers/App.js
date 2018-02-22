import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SearchPage from '../Components/SearchPage';
import LoginPage from '../Components/LoginPage';

class App extends Component {
  render() {
    const { isUserLoggedIn } = this.props;
    return (
      <Fragment>
        {isUserLoggedIn ? <SearchPage /> : <LoginPage />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isUserLoggedIn: state.loginReducer.isUserLoggedIn,
});

export default connect(mapStateToProps)(App);
