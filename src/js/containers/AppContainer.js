import App from "containers/App"
import { currentPos  } from 'actions/index'
import { connect } from 'react-redux'

const mapStateToProps = (state =[]) => {
  return {
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: data => {
      dispatch(currentPos(data))
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


export default AppContainer;
