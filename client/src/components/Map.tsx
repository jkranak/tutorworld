// @ts-nocheck
import React, {useState, useEffect} from 'react';
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox, InfoWindow } from '@react-google-maps/api';
import {getAllLibraries, getLibraryAllTutors} from '../services/apiMaps';

const containerStyle = {
  width: '800px',
  height: '800px'
};


const Map = () => {

  const [searchBox, setSearchBox] = useState();
  const [lng, setLng] = useState(-79.874420);
  const [lat, setLat] = useState(43.256531);
  const [librarys, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [libraryAllTutors, setLibraryAllTutors] = useState([]);

  const onLoad = (ref:any) => setSearchBox(ref);

  const onPlacesChanged = () => {
    // @ts-ignore
    setLng((searchBox.getPlaces()[0].geometry.location.lng)());
    // @ts-ignore
    setLat((searchBox.getPlaces()[0].geometry.location.lat)());
  }

  const handleClick = (library:any) => {
    const LibraryId = library.id;
    getLibraryAllTutors(LibraryId).then((libraryTutors)=>{
      setLibraryAllTutors(libraryTutors);
    })
    setSelectedLibrary(library);
  }

  console.log(libraryAllTutors);
  useEffect(() => {
    getAllLibraries().then((allLibraries) => {
      setLibraries(allLibraries);
    }
    )
  }, [])

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
        {librarys.map((library:any) => <Marker key={library.id} position={{lat: library.lat,lng: library.lng }} onClick={()=> {handleClick(library)}}/>)}
        {selectedLibrary && (
          <InfoWindow position={{lat: selectedLibrary.lat,lng: selectedLibrary.lng }} onCloseClick={()=>{setSelectedLibrary(null)}}>
            <div>Library Name: {selectedLibrary.name}<br></br>Address: {selectedLibrary.address} </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)