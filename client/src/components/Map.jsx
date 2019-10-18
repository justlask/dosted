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
        console.log(this)
        axios.get(`${serverUrl}/map/getkey`).then(key => {

            axios.get(`${serverUrl}/map`).then(locations => {
                this.setState({
                    locations: locations.data,
                    key: key.data
                })
            })

        })



    }

   renderMap = () => {
       if(!this.state.key){
            return <div>...loading</div>
       }
    return (
        <div className="map">
            <div>
            </div>
            <GoogleMapReact
                bootstrapURLKeys={{key: this.state.key}}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
            >
        
                 <Marker lat={19.390519} lng={-99.4238064} text={'A'} /* Kreyser Avrora */ />
            </GoogleMapReact>
        </div>
    )
   }


   
   render() {
    console.log(this.state)

       return (
            this.renderMap()
            // <div></div>
       )
   }
}
export default Map;