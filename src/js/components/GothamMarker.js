import React, {Component} from "react"
import PropTypes from 'prop-types'
const {
  Marker,
  InfoWindow,
} = require("react-google-maps");

class GothamMarker extends Component {
  constructor() {
    super();
    this.state ={
      isOpen: false,
      lat: 0,
      lng: 0
    }
    this._onToggleOpen = this._onToggleOpen.bind(this);
  }
  _onToggleOpen(){
    this.setState({isOpen:!this.state.isOpen})
  }
  componentDidMount(){
    this.setState({
      lat: this.props.lat,
      lng: this.props.lng,
      latInfo: this.props.lat,
      lngInfo: this.props.lng,
    })
  }
  render() {
    const {place, location, probability} = this.props;
    return (
    <Marker
        position={{ lat: location.lat, lng: location.lng}}
        onClick={this._onToggleOpen}
      >
        {this.state.isOpen && <InfoWindow onCloseClick={this._onToggleOpen}>
         <div>
            <b>{place}</b><br/>
            {probability && <i>Atack Probability: {probability.toFixed(2) + "%"} </i>}
         </div>
        </InfoWindow>}
      </Marker>
    );
  }
}
GothamMarker.propTypes = {
  place: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  probability: PropTypes.number.isRequired,
}
export default GothamMarker;