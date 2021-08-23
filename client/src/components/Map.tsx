import React, {useState} from 'react';
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '800px'
};

const Map = () => {

  const [searchBox, setSearchBox] = useState();
  const [lng, setLng] = useState(-79.874420);
  const [lat, setLat] = useState(43.256531)

  const onLoad = (ref:any) => setSearchBox(ref);

  const onPlacesChanged = () => {
    // @ts-ignore
    setLng((searchBox.getPlaces()[0].geometry.location.lng)());
    // @ts-ignore
    setLat((searchBox.getPlaces()[0].geometry.location.lat)())
  }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBnYtRUEC--MMTK25JkUdkVM15khupjeZA"
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat,
          lng
        }}
        zoom={10}
      >
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "50%",
          marginLeft: "-120px"
        }}
      />
    </StandaloneSearchBox>
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)


