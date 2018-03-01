import { GoogleConfig } from "config/Config"
import React, {Component} from "react"
const { compose, withProps, withHandlers, lifecycle, withStateHandlers } = require("recompose");
import PersonMarker from 'components/PersonMarker';
import GothamMarker from 'components/GothamMarker';

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require("react-google-maps");

let count = 0;
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: GoogleConfig,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    directions: null,
    distance: "",
    durantion: "",
    steps: [],
    showMarker: true
  }), {
    setDirections: () => (result, {distance, duration, steps}) => ({
      directions: result,
      duration: duration.text,
      distance: distance.text,
      steps: steps,
      showMarker: false
    }),
    removeDirections: () => () => ({
      directions: null,
      duration: "",
      distance: "",
      steps: [],
      showMarker: true
    }),
    configureDirections: () => (origin, destination, cb) =>{
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          cb(result, result.routes[0].legs[0])
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  }),
  withHandlers({
    createRoute: props => e => {
      e.preventDefault()
      props.configureDirections(props.batMobile, props.location, props.setDirections); 
    } 
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      //console.log(this.props)
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={new google.maps.LatLng(props.location.lat, props.location.lng)}
  > 
    {props.showMarker && 
      <PersonMarker lat={props.location.lat} 
                    lng={props.location.lng} 
                    name={props.villain} color="green" 
                    icon="img/ico_villain.png" 
                    update={props.setVillainPosition}
                  />}
    {props.showMarker && 
      <PersonMarker 
                    lat={props.batMobile.lat} 
                    lng={props.batMobile.lng} 
                    name={"Batmobile"} 
                    icon="img/ico_batman.png" 
                    color="black" 
                    update={props.setBatmobilePosition}
                    />}
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    {props.targets.map(item =>  <GothamMarker key={count++} {...item}  />)}
    {props.targets.map(item =>  <div key={count++}>  {item.place} : {item.probability.toFixed(0) +"%"} <hr /></div>)}
    <button onClick={props.createRoute}>Create Route</button>
     <button onClick={props.removeDirections}>Remove Route</button>
    <div>{props.duration}</div>
    <div>{props.distance}</div>
    <ul>{props.steps.map(item => <li  key={count++}  dangerouslySetInnerHTML={{ __html: item.instructions }} />  )}</ul>
  </GoogleMap>
);
export default MapWithADirectionsRenderer