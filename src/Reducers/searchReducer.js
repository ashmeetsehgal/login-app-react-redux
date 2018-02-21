const defaultSearchState = {
  nextUrl: '',
  prevUrl: '',
  results: [],
};

export default function searchReducer(state = defaultSearchState, action) {
  if (action.type === 'UPDATE_SEARCH_RESULTS') {
    return { ...state, ...action.payload };
  }
  return state;
}
