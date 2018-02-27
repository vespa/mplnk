import React, { Component } from "react";
import GetData from 'helpers/GetData'
class App extends Component {

  constructor() {
    super();
    this.state ={
    	lat: 40.754671,
    	long: -73.988568
    }
    this._call = this._call.bind(this);
  }
  _fetchData(data) {
  	this.props.fetchData(data)
  }

  _call(){
  	GetData({lat: this.state.lat, long: this.state.long})
     	.then(res => this._fetchData(res))
  }
  componentDidMount(){
  	this._call()
  }

  render() {
    return (
      <div >
      	hey
      </div>
    );
  }
}
export default App;