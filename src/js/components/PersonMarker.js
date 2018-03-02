import { GoogleConfig } from "config/Config"
import React, {Component} from "react"
import PropTypes from 'prop-types'
const {
  Marker,
  InfoWindow,
} = require("react-google-maps");

class PersonMarker extends Component {
  constructor() {
    super();
    this.state ={
      isOpen: true,
      lat: 0,
      lng: 0,
      update: () => {}
    }
    this._onToggleOpen = this._onToggleOpen.bind(this);
    this._updatePlace = this._updatePlace.bind(this)
    this._updatePlaceInfo = this._updatePlaceInfo.bind(this)
  }
  _onToggleOpen(){
    this.setState({isOpen:!this.state.isOpen})
  }
  _updatePlace(e){
    const lat = e.latLng.lat();
    const lng = e.latLng.lng()
    this.setState({
      lat,
      lng,
      latInfo: lat,
      lngInfo: lng,
    })
    this.state.update({lat, lng})
  }
  _updatePlaceInfo(){
    this.setState({
      latInfo: "",
      lngInfo: ""
    })
  }
  componentDidMount(){
    this.setState({
      lat: this.props.lat,
      lng: this.props.lng,
      latInfo: this.props.lat,
      lngInfo: this.props.lng,
    })
    if(this.props.update) this.setState({update: this.props.update})
  }
  render() {
    const {name, color, icon} = this.props;
    return (
    <Marker
        position={{ lat: this.state.lat, lng: this.state.lng}}
        onClick={this._onToggleOpen}
        defaultIcon={icon}
        zIndex={100}
        draggable={true}
        onDragStart ={this._updatePlaceInfo}
        onDragEnd={this._updatePlace}
      >
        {this.state.isOpen && <InfoWindow onCloseClick={this._onToggleOpen}>
         <div>
            <b style={{color: color }}>{name}</b> current position<br/>
            lat: {this.state.latInfo} <br/>
            lng: {this.state.lngInfo}
         </div>
        </InfoWindow>}
      </Marker>
    );
  }
}
PersonMarker.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}
export default PersonMarker;