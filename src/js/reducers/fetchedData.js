
const INITIAL_STATE = {
	fetchedData: [],
    villain : {name:"", location: {lat: 0, lng:0}},
    targets: []
}

const fetchedData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCHED_DATA':
      return Object.assign({}, state, action.fetchedData);
    default:
      return state;
  }
}
export default fetchedData