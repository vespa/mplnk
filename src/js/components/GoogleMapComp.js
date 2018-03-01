import { GoogleConfig } from "config/Config"
import React, {Component} from "react"
const { compose, withProps, lifecycle, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} = require("react-google-maps");


class PersonMarker extends Component {
  constructor() {
    super();
    this.state ={
      isOpen: true,
      lat: 0,
      lng: 0
    }
    console.log(this.props)
    this._onToggleOpen = this._onToggleOpen.bind(this);
    this._updatePlace = this._updatePlace.bind(this)
    this._updatePlaceInfo = this._updatePlaceInfo.bind(this)
  }
  _onToggleOpen(){
    this.setState({isOpen:!this.state.isOpen})
  }
  _updatePlace(e){
    this.setState({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      latInfo: e.latLng.lat(),
      lngInfo: e.latLng.lng(),
    })
  }
  _updatePlaceInfo(e){
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
  }
  render() {
    const {name, isOpen, onToggleOpen, color, icon} = this.props;
    return (
    <Marker
        position={{ lat: this.state.lat, lng: this.state.lng}}
        onClick={this._onToggleOpen}
        defaultIcon={icon}
        zIndex={6}
        draggable={false}
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

//<PersonMarker lat={props.location.lat} lng={props.location.lng} name={props.villain} color="green" icon="img/ico_villain.png" />
// const PersonMarkerx = compose(
//   withStateHandlers(() => ({
//     isOpen: true,
//   }), {
//     onToggleOpen: ({ isOpen }) => () => ({
//       isOpen: !isOpen,
//     }),
//     updatePlace: (props) => (e) =>{
//       console.log(e.latLng.lat())
//       console.log(e.latLng.lng())
//     }
//   }),
// )(({name, lat, lng, isOpen, onToggleOpen, color, icon, updatePlace}) => 
//   <Marker
//       position={{ lat: lat, lng: lng}}
//       onClick={onToggleOpen}
//       defaultIcon={icon}
//       zIndex={6}
//       draggable={false}
//       onDrag={updatePlace}
//     >
//       {isOpen && <InfoWindow onCloseClick={onToggleOpen}>
//        <div>
//           <b style={{color: color }}>{name}</b> current position<br/>
//        </div>
//       </InfoWindow>}
//     </Marker>
// )

const GothamMarkers = compose(
  withStateHandlers(
    () => ({}), 
    {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
)(props => 
  <Marker
      position={{ lat: props.target.location.lat, lng: props.target.location.lng}}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
       <div>
          <b>{props.target.place}</b><br/>
          {props.target.probability && <i>Atack Probability: {props.target.probability.toFixed(2) + "%"} </i>}
       </div>
      </InfoWindow>}
    </Marker>
)

const ConfigureDirections = (t, origin, destination) => {
  const DirectionsService = new google.maps.DirectionsService();
  DirectionsService.route({
    origin: new google.maps.LatLng(origin.lat, origin.lng),
    destination: new google.maps.LatLng(destination.lat, destination.lng),
    travelMode: google.maps.TravelMode.DRIVING,
  }, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      t.setState({
        directions: result,
      });
    } else {
      console.error(`error fetching directions ${result}`);
    }
  });
}

let count = 0;
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: GoogleConfig,
    suppressMarkers: true,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      console.log(this.props)
      //ConfigureDirections(this, this.props.batMobile, this.props.location);
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={new google.maps.LatLng(props.location.lat, props.location.lng)}
  > 
    <PersonMarker lat={props.location.lat} lng={props.location.lng} name={props.villain} color="green" icon="img/ico_villain.png" />
    <PersonMarker lat={props.batMobile.lat} lng={props.batMobile.lng} name={"Batmobile"} icon="img/ico_batman.png" color="black" />
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    {props.targets.map(item =>  <GothamMarkers key={count++} target={item}  />)}

  </GoogleMap>
);
export default MapWithADirectionsRenderer
