import App from "containers/App"
import { fetchedData, villainData } from 'actions/index'
import { connect } from 'react-redux';
import { GothamBoundaries } from "config/Config"

const mapStateToProps = (state) => {
  return {
    //fetchedData: state.fetchedData,
    villain:      state.fetchedData.villain.name,
    location:     state.fetchedData.villain.location,
    targets:      state.fetchedData.targets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    randomPos: () =>{
      return {
        lat: GothamBoundaries().lat,
        lng: GothamBoundaries().lng
      }
    },
    fetchData: data => {
      dispatch(fetchedData(data));
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer;
