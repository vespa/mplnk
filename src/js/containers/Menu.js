import Menu from "components/Menu"
import { createDestroyRoute , openCloseTargetList} from 'actions/index'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {

  return {
     activeRoute: state.menu.activeRoute
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createRoute: data => e => {
      e.preventDefault();
      dispatch(createDestroyRoute(!data))
    }
  }
}
const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default Container;