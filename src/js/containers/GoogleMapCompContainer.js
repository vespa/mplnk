import PersonMarker from "containers/GoogleMapComp"
import { fetchedData, fetchedDataBatmobile, fetchedDataVillainLocation, updateTargets} from 'actions/index'
import { connect } from 'react-redux';
import { GothamBoundaries } from "config/Config"
import fetchData from 'helpers/fetchData'

const mapStateToProps = (state) => {
  return {
    location:     state.fetchedData.villain.location,
    batMobile:    state.fetchedData.batMobile,
    targets:      state.fetchedData.targets,
    activeRoute:  state.menu.activeRoute
  }
}
const message = "OUT OF GOTHAM"
const mapDispatchToProps = dispatch => {
  return {
    setBatmobilePosition: data => {
      dispatch(fetchedDataBatmobile(data));
      return fetchData.get(data).then(res => {
          dispatch(updateTargets(res.targets));
          return res;
      }).catch(err => {
          alert(message);
      });
    },
    setVillainPosition: data => {
      dispatch(fetchedDataVillainLocation(data));
      return fetchData.get(data).then(res => {
          dispatch(updateTargets(res.targets));
          return res;
      }).catch(err => {
           alert(message);
      });
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonMarker)

export default Container;
