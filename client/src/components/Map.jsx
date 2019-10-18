import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'
import axios from 'axios'
import serverUrl from '../configServer'

class Map extends Component {
    state = {
        center: {
            lat: 44,
            lng: -12
        },
        zoom: 2
    }


    componentDidMount() {
        axios.get(`${serverUrl}/map`).then(data => {
            this.setState({
                locations: data.data
            })
        })
    }

   renderMap = () => {
    return (
        <div className="map">
            <div>
            </div>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAXRFFGyftsCPWQA7TDXl8ah7fCdeJedsQ" }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
            >
        
                 <Marker lat={19.390519} lng={-99.4238064} text={'A'} /* Kreyser Avrora */ />
            </GoogleMapReact>
        </div>
    )
   }


   
   render() {
    console.log(this.state.locations)
       return (
            this.renderMap()
       )
   }
}
export default Map;