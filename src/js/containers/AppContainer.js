import App from "containers/App"
import { fetchedData, fetchedDataBatmobile } from 'actions/index'
import { connect } from 'react-redux';
import { GothamBoundaries } from "config/Config"

const mapStateToProps = (state) => {
  return {
    villain:      state.fetchedData.villain.name,
    location:     state.fetchedData.villain.location,
    targets:      state.fetchedData.targets,
    batMobile:    state.fetchedData.batMobile
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
    },
    setBatmobilePosition: data => {
      dispatch(fetchedDataBatmobile(data));
    }
  }
}
const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default Container;
