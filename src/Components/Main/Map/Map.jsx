import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import React, { useState } from 'react'
const MapContainer = (props) => {
  let center = { lat: props.data[0].coord.lat, lng: props.data[0].coord.lon }

  const [mapState, setMapState] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  })

  let onMarkerClick = (props, marker, e) =>
    setMapState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    })

  let onMapClicked = (props) => {
    if (mapState.showingInfoWindow) {
      setMapState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    }
  }

  const renderData = props.data.map((i, index) => {
    return (
      <div key={index}>
        <div>{Math.round(i.temp)}&#176;C</div>
        <div>{i.name}</div>
        <div>{i.date}</div>
        <div>
          {i.clouds < 50 ? 'Clear' : 'Cloudy'}, Wind-{i.wind} meter per second
        </div>
      </div>
    )
  })
  return (
    <Map
      google={props.google}
      zoom={10}
      center={center}
      onClick={onMapClicked}
      style={{
        width: '60%',
        height: '60%',
        position: 'relative',
        marginLeft: '40px',
      }}
    >
      <Marker
        onClick={onMarkerClick}
        name={'Current location'}
        position={center}
      />

      <InfoWindow
        marker={mapState.activeMarker}
        visible={mapState.showingInfoWindow}
      >
        <div>{renderData}</div>
      </InfoWindow>
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC58_wSDE9-sMcEAxi0M7SidNE3Fa67plo',
})(MapContainer)
