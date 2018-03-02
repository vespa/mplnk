import React, {Component} from "react"
import PropTypes from 'prop-types'
import MenuItem from 'components/MenuItem';

class Menu extends Component {
  constructor() {
    super();
    this.state ={}
  }
  render() {
    const { createRoute, activeRoute, modalPlaces, modalInstructions} = this.props;
    return (
    <div style={styles}>
      <nav className="navbar-dark bg-dark p-2 text-center rounded">
            {!activeRoute && <MenuItem onClick={createRoute(activeRoute)} text={"create route"} />}
            {activeRoute && <MenuItem onClick={createRoute(activeRoute)} text={"remove route"} type="btn-info "/>}
            <MenuItem text={"places in danger"}  dataToggle="modal" dataTarget={"#"+modalPlaces} type="btn-warning"/>
      </nav>
      <div style={buttonStyle} >
        {activeRoute && <MenuItem text={"show route instructions"}  dataToggle="modal" dataTarget={"#"+modalInstructions} type="btn-danger" />}
      </div>
    </div>
    );
  }
}
const styles = {
  position: 'fixed',
  zIndex: 1000,
  width: '100%',
  maxWidth: "600px",
  top: "0",
  padding: "1rem 0.5rem",
  left: "50%",
  transform: "translateX(-50%)",
  opacity: .85
}
const buttonStyle ={
  position: 'fixed',
  right: "0",
  top: "6rem"
}

Menu.propTypes = {
  createRoute: PropTypes.func.isRequired,
  activeRoute: PropTypes.bool.isRequired,
  modalPlaces: PropTypes.string.isRequired,
  modalInstructions: PropTypes.string.isRequired,
}

export default Menu;