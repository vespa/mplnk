import React from "react"
import PropTypes from 'prop-types';

const MenuItem = ({onClick, text, type="btn-primary", dataToggle, dataTarget}) => {

  return   <button className={"btn m-2 "+type} href="#" 
            	onClick={onClick} 
            	data-toggle={dataToggle} 
            	data-target={dataTarget}
            >{text} </button>
}
MenuItem.propTypes = {
  text:      PropTypes.string.isRequired,
}
export default MenuItem;