import React from "react"

const MenuItem = ({onClick, text, type="btn-primary"}) => {
  return  <div className="form-group mr-2 mb-2 mt-2">
            <button onClick={onClick} className={"btn "+type}> {text} </button>
          </div>
}

export default MenuItem;