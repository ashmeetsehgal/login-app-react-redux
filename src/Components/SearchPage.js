import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlanetCard from './PlanetCard';
import { updateSearchResultsAction } from '../Actions/searchAction';

class SearchPage extends Component {
  componentDidMount() {
    fetch('https://swapi.co/api/planets/?format=json')
      .then(res => res.json())
      .then((data) => {
        this.props.updateSearchResultsAction({
          results: data.results,
          prevUrl: data.previous,
          nextUrl: data.next,
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
    const { results, prevUrl, nextUrl } = this.props;
    return (
      <div>
        <input type='text' />
        {this.renderPlanetCard(results)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.searchReducer.results,
  prevUrl: state.searchReducer.prevUrl,
  nextUrl: state.searchReducer.nextUrl,
});
const mapDispatchToProps = dispatch => ({
  updateSearchResultsAction: props => dispatch(updateSearchResultsAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
