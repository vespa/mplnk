import React, {Component} from "react"
import PropTypes from 'prop-types'

let count=0;
class TargetList extends Component {
  constructor() {
    super();
    this.state ={
        showHide: true,
        buttonLabel: 'open'
    }
    this._showHide = this._showHide.bind(this);
  }
  _showHide(){
    this.setState({buttonLabel: (this.props.open)? "close": "open"})
  }
  render() {
    const { targets, open } = this.props;
    return (
        <div>
            {open && targets.map(item =>  <div key={count+1+"_"+item.place}>  {item.place} : {item.probability.toFixed(0) +"%"} <hr /></div>)}
        </div>
    );
  }
}
TargetList.propTypes = {
  targets: PropTypes.array.isRequired,
  open:    PropTypes.bool.isRequired,
}
export default TargetList;