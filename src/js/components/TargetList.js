import React from "react"
import PropTypes from 'prop-types'
import Modal from "components/Modal"

let count=0;
const TargetList =({ targets , id }) => {
    return (
        <Modal id={id} title="PLACES">
            {targets.map(item =>  <div key={count+1+"_"+item.place}>  
                <b>{item.place} </b><br/>
                Risk: {item.probability.toFixed(0) +"%"} <hr />
            </div>)}
        </ Modal>
    );
}

TargetList.propTypes = {
  targets: PropTypes.arrayOf(
    PropTypes.shape({
      place: PropTypes.string.isRequired,
      probability: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  id:      PropTypes.string.isRequired,
}
export default TargetList;