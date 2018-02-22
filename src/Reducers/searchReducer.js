const defaultSearchState = {
  nextUrl: '',
  prevUrl: '',
  results: [],
  searchString: '',
  isFetching: false,
};

export default function searchReducer(state = defaultSearchState, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH_RESULTS':
      return { ...state, ...action.payload };
    case 'UPDATE_SEARCH_PLANET':
      return { ...state, ...action.payload };
    case 'UPDATE_FETCH_STATUS': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}
