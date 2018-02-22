import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlanetCard from './PlanetCard';
import { updateSearchResultsAction, updateFetchStatusAction } from '../Actions/searchAction';
import debounce from '../utils/debouce';
import throttle from '../utils/throttle';
import './search-page.scss';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
    };
  }
  componentDidMount() {
    const { updateSearchResults, isLuke } = this.props;
    fetch('https://swapi.co/api/planets/?format=json')
      .then(res => res.json())
      .then((data) => {
        updateSearchResults({
          results: data.results,
          prevUrl: data.previous,
          nextUrl: data.next,
        });
      });
    if (isLuke) {
      document.querySelector('.search-textfield').addEventListener(
        'keydown',
        debounce(this.fetchResults, 500),
      );
    } else {
      document.querySelector('.search-textfield').addEventListener(
        'keydown',
        debounce(throttle(this.fetchResults, 60000), 500),
      );
    }
  }

  fetchResults = () => {
    const { searchString } = this.state;
    const { updateSearchResults, updateFetchStatus } = this.props;
    updateFetchStatus({
      isFetching: true,
    });
    fetch(`https://swapi.co/api/planets/?search=${searchString}`)
      .then(res => res.json()).then((data) => {
        updateSearchResults({
          results: data.results,
          prevUrl: data.previous,
          nextUrl: data.next,
          isFetching: false,
        });
      }).catch((err) => {
        console.log(`error in fetching swapi api ${err}`);
      });
  }

  updateResults = (e) => {
    const { value } = e.target;
    this.setState({
      searchString: value,
    });
  }
  goTopage = (url) => {
    const { updateSearchResults, updateFetchStatus } = this.props;
    updateFetchStatus({
      isFetching: true,
    });
    fetch(url)
      .then(res => res.json()).then((data) => {
        updateSearchResults({
          results: data.results,
          prevUrl: data.previous,
          nextUrl: data.next,
          isFetching: false,
        });
      });
  }
  renderPlanetCard = (results) => {
    if (results.length > 0) {
      const planetCards = results.map(i => (
        <PlanetCard key={i.name} planetDetails={i} />
      ));
      return planetCards;
    } return <div className='text-center'> No results found </div>;
  }

  render() {
    const {
      props, state, updateResults, goTopage, renderPlanetCard,
    } = this;
    const { searchString } = state;
    const {
      results,
      prevUrl,
      nextUrl,
      isFetching,
      username,
    } = props;
    return (
      <div className='search-container'>
        <div className='text-center'> Hi {username} </div>
        <input
          className='search-textfield'
          type='text'
          placeholder='Search For Planet'
          value={searchString}
          onChange={updateResults}
        />
        {isFetching ? <div className='text-center'> Loading... </div> :
        <Fragment>
          {renderPlanetCard(results)}
          {prevUrl && <button onClick={() => goTopage(prevUrl)} className='btn'> Previous </button>}
          {nextUrl && <button onClick={() => goTopage(nextUrl)} className='btn'> Next </button>}
        </Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.searchReducer.results,
  prevUrl: state.searchReducer.prevUrl,
  nextUrl: state.searchReducer.nextUrl,
  searchString: state.searchReducer.searchString,
  isFetching: state.searchReducer.isFetching,
  isLuke: state.loginReducer.isLuke,
  username: state.loginReducer.username,
});
const mapDispatchToProps = dispatch => ({
  updateSearchResults: props => dispatch(updateSearchResultsAction(props)),
  updateFetchStatus: props => dispatch(updateFetchStatusAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

SearchPage.propTypes = {
  updateFetchStatus: PropTypes.func.isRequired,
  updateSearchResults: PropTypes.func.isRequired,
  isLuke: PropTypes.bool.isRequired,
};
