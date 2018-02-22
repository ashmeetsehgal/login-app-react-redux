import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlanetCard from './PlanetCard';
import { updateSearchResultsAction } from '../Actions/searchAction';
import Debounce from '../utils/debouce';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
    };
  }
  componentDidMount() {
    const { updateSearchResults } = this.props;
    fetch('https://swapi.co/api/planets/?format=json')
      .then(res => res.json())
      .then((data) => {
        updateSearchResults({
          results: data.results,
          prevUrl: data.previous,
          nextUrl: data.next,
        });
      });
    document.querySelector('.search-textfield').addEventListener('keydown', Debounce(this.fetchResults, 500));
  }

  fetchResults = () => {
    const { searchString } = this.state;
    const { updateSearchResults } = this.props;
    fetch(`https://swapi.co/api/planets/?search=${searchString}`)
      .then(res => res.json()).then((data) => {
        updateSearchResults({
          results: data.results,
          prevUrl: data.previous,
          nextUrl: data.next,
        });
      });
  }

  updateResults = (e) => {
    const { value } = e.target;
    this.setState({
      searchString: value,
    });
  }
  goTopage = (url) => {
    const { updateSearchResults } = this.props;
    updateSearchResults({
      isFething: true,
    });
    fetch(url)
      .then(res => res.json()).then((data) => {
        updateSearchResults({
          results: data.results,
          prevUrl: data.previous,
          nextUrl: data.next,
          isFething: false,
        });
      });
  }
  renderPlanetCard = (results) => {
    const planetCards = results.map(i => (
      <PlanetCard key={i.name} planetDetails={i} />
    ));
    return planetCards;
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
    } = props;
    return (
      <div>
        <input
          className='search-textfield'
          type='text'
          placeholder='Search'
          value={searchString}
          onChange={updateResults}
        />
        {renderPlanetCard(results)}
        {prevUrl && <button onClick={() => goTopage(prevUrl)} > Previous </button>}
        {nextUrl && <button onClick={() => goTopage(nextUrl)}> Next </button>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.searchReducer.results,
  prevUrl: state.searchReducer.prevUrl,
  nextUrl: state.searchReducer.nextUrl,
  searchString: state.searchReducer.searchString,
});
const mapDispatchToProps = dispatch => ({
  updateSearchResults: props => dispatch(updateSearchResultsAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
