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
        zoom: 6
    }

    componentDidMount() {
        axios.get(`${serverUrl}/map/getkey`).then(response => {
            console.log(response.data)
            axios.get(`${serverUrl}/map`).then(locations => {
                this.setState({
                    locations: locations.data,
                    key: response.data.key,
                    center: {
                        lat: response.data.lat,
                        lng: response.data.long
                    }
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
       )
   }
}
export default Map;