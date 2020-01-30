import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'
import axios from 'axios'
import serverUrl from '../configServer'

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 44,
                lng: -12
            },
            zoom: 8
        }
    }

    componentDidMount() {
        axios.get(`${serverUrl}/map/getkey`).then(response => {
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

    handleMarkers = () => {
        return this.state.locations.map((location, key) => {
            return <Marker lat={location.lat} lng={location.long} text={key} />
        })
    }

    renderMap = () => {
        if (!this.state.key) {
            return <div>...loading</div>
        }
        return (
            <div className="map">
                <div>
                </div>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: this.state.key }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >

                    {this.handleMarkers()}
                </GoogleMapReact>
            </div>
        )
    }



    render() {
        return (
            this.renderMap()
        )
    }
}
export default Map;