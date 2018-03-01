
const INITIAL_STATE = {
    fetchedData: [],
    villain : {name:"", location: {lat: 0, lng:0}},
    targets: [],
    batMobile: {
        lat: 0,
        lng: 0
    }
}

const fetchedData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCHED_DATA':
      return Object.assign({}, state, action.fetchedData);
    case 'FETCHED_DATA_BATMOBILE': {
      return Object.assign({}, state, action);
    }
    case 'FETCHED_DATA_VILLAIN_LOCATION': {
      var villain = Object.assign({}, state);
      villain.villain.location = action.location;
      return villain;
    }
    case 'FETCHED_DATA_UPDATE_TARGETS':
     return Object.assign({}, state, action);
    default:
      return state;
  }
}
export default fetchedData