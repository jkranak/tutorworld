// @ts-nocheck
import React, {useState, useEffect} from 'react';
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox, InfoWindow } from '@react-google-maps/api';
import {getAllLibraries, getLibraryAllTutors} from '../services/apiMaps';
import dotenv from 'dotenv';
import { Navbar } from '../components/Navbar';
import { SearchResult } from '../components/SearchResult';
dotenv.config();

const containerStyle = {
  width: '100%',
  height: '100%'
};

const Map = () => {

  const [searchBox, setSearchBox] = useState();
  const [lng, setLng] = useState(-79.874420);
  const [lat, setLat] = useState(43.256531);
  const [librarys, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [libraryAllTutors, setLibraryAllTutors] = useState(null);

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

  useEffect(() => {
    getAllLibraries().then((allLibraries) => {
      setLibraries(allLibraries);
    }
    )
  }, [])



  return (
    <div>
      <Navbar />
      <div className="map">
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
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
                placeholder="Search Google Maps"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `24rem`,
                  height: `4rem`,
                  padding: `0 12px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `1.6rem`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  top: "1.4rem",
                  marginLeft: "-120px"
                }}
              />
            </StandaloneSearchBox>
            {librarys.map((library:any) => <Marker key={library.id} position={{lat: library.lat,lng: library.lng }} onClick={()=> {handleClick(library)}}/>)}
            {selectedLibrary && libraryAllTutors && (
              <InfoWindow position={{lat: selectedLibrary.lat,lng: selectedLibrary.lng }} onCloseClick={()=>{setSelectedLibrary(null)}}>
                <div className="pop-up">
                  <div className="pop-up__title">
                    <h3>Library Name: {selectedLibrary.name}<br></br>Address: {selectedLibrary.address} </h3>
                  </div>
                  <div>
                    {libraryAllTutors.map((libraryAllTutor)=>
                    <div className="map-card">
                      <SearchResult tutor={libraryAllTutor}/>
                    </div>
                    )}
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  )
}

export default React.memo(Map)