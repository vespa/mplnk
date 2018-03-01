import React, { Component } from "react";
import GetData from 'helpers/GetData'
import GoogleMapComp from "containers/GoogleMapCompContainer"

let count = 0;
class App extends Component {
  constructor() {
    super();
    this.state ={
      villainLat: 0,
      villainLng: 0,
      batMobileLat: 0,
      batMobileLng: 0,
      map: ""
    }
    this._call                  = this._call.bind(this);
    this._setVillainPosition    = this._setVillainPosition.bind(this);
    this._setBatmobilePosition  = this._setBatmobilePosition.bind(this);
  }

  _fetchData(data) {
    this.props.fetchData(data);
    this._setVillainPosition()
  }

  _call(){
    GetData({lat: this.state.villainLat, lng: this.state.villainLng})
      .then(res => this._fetchData(res))
  }
  
  _setVillainPosition(){
    const pos = this.props.location;
    this.setState({ villainLat: pos.lat, villainLng: pos.lng });
  }
  _setBatmobilePosition(){
    const pos = this.props.randomPos();
    const posVillain = this.props.randomPos();
    this.props.setBatmobilePosition({lat: pos.lat, lng: pos.lng, })
    this.setState({ batMobileLat: pos.lat, batMobileLng: pos.lng, villainLat: posVillain.lat, villainLng: posVillain.lng} , ()=>{
        this._call();
    });
  }

  componentDidMount(){
    this._setBatmobilePosition();
  }

  render() {
    const {villain, location, targets} = this.props;
    const {batMobileLat, batMobileLng, vil} = this.state;
    const batMobile = {lat: batMobileLat, lng: batMobileLng};
    const obj = {targets, batMobile, villain} ;
    return (
      <div >
      lalalala
      <GoogleMapComp 
         {...obj}
         location = {{lng: this.state.villainLng, lat: this.state.villainLat}}
      />

      </div>
    );
  }
}
export default App;