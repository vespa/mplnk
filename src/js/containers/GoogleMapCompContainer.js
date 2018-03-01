import PersonMarker from "containers/GoogleMapComp"
import { fetchedData, fetchedDataBatmobile, fetchedDataVillainLocation, updateTargets} from 'actions/index'
import { connect } from 'react-redux';
import { GothamBoundaries } from "config/Config"
import GetData from 'helpers/GetData'

const mapStateToProps = (state) => {
  return {
    location:     state.fetchedData.villain.location,
    batMobile:    state.fetchedData.batMobile,
    targets:      state.fetchedData.targets
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setBatmobilePosition: data => {
      dispatch(fetchedDataBatmobile(data));
    },
    setVillainPosition: data => {
      dispatch(fetchedDataVillainLocation(data));
      GetData(data).then(res => {
          dispatch(updateTargets(res.targets));
      }).catch(err => {
          console.log("OUT OF BOUNDARIES");
      });
    }
  }
}
const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonMarker)

export default Container;
