import { GoogleConfig } from "config/Config"
import React from "react"
const { compose, withProps, lifecycle, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} = require("react-google-maps");

const ConfigureDirections = (t) => {
  const DirectionsService = new google.maps.DirectionsService();
  DirectionsService.route({
    origin: new google.maps.LatLng(41.8507300, -87.6512600),
    destination: new google.maps.LatLng(41.8525800, -87.6514100),
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

const PersonMarker = compose(
  withStateHandlers(() => ({
    isOpen: true,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    }),
    updatePlace: (props) => (e) =>{
      console.log(e.latLng.lat())
      console.log(e.latLng.lng())
    }
  }),
)(({name, lat, lng, isOpen, onToggleOpen, color, icon, updatePlace}) => 
  <Marker
      position={{ lat: lat, lng: lng}}
      onClick={onToggleOpen}
      defaultIcon={icon}
      zIndex={3}
      draggable={false}
      onDrag={updatePlace}
    >
      {isOpen && <InfoWindow onCloseClick={onToggleOpen}>
       <div>
          <b style={{color: color }}>{name}</b> current position<br/>
       </div>
      </InfoWindow>}
    </Marker>
)

const GothamMarkers = compose(
  withStateHandlers(() => ({
    //isOpen: false,
  }), {
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

let count = 0;
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: GoogleConfig,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      console.log(this.props)
      //ConfigureDirections(this);
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={new google.maps.LatLng(props.location.lat, props.location.lng)}
  > 
    <PersonMarker lat={props.location.lat} lng={props.location.lng} name={props.villain} color="green" icon="img/ico_villain.png" />
    <PersonMarker lat={props.batMobile.batMobileLat} lng={props.batMobile.batMobileLng} name={"Batmobile"} icon="img/ico_batman.png" color="black" />
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    {props.targets.map(item =>  <GothamMarkers key={count++} target={item}  />)}

  </GoogleMap>
);
export default MapWithADirectionsRenderer
