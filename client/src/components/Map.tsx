// @ts-nocheck
import React, {useState, useEffect} from 'react';
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox, InfoWindow } from '@react-google-maps/api';
import {getAllLibraries, getLibraryAllTutors} from '../services/apiMaps';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currentTutorInfo } from '../redux/actions/currentTutorInfo';


const containerStyle = {
  width: '600px',
  height: '600px'
};

const Map = () => {

  const [searchBox, setSearchBox] = useState();
  const [lng, setLng] = useState(-79.874420);
  const [lat, setLat] = useState(43.256531);
  const [librarys, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [libraryAllTutors, setLibraryAllTutors] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleSchedule = (libraryAllTutor) => {
    dispatch(currentTutorInfo(libraryAllTutor));
    history.push('/schedule');
  }

  const handleProfile = (libraryAllTutor) => {
    dispatch(currentTutorInfo(libraryAllTutor));
    history.push('/viewprofile');
  }

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
        {selectedLibrary && libraryAllTutors && (
          <InfoWindow position={{lat: selectedLibrary.lat,lng: selectedLibrary.lng }} onCloseClick={()=>{setSelectedLibrary(null)}}>
            <div>
              <h3>Library Name: {selectedLibrary.name}<br></br>Address: {selectedLibrary.address} </h3>
              <div>
                {libraryAllTutors.map((libraryAllTutor, index)=>
                  <div>
                    <h5>
                      {`Tutor ${index+1}: ${libraryAllTutor.firstName} ${libraryAllTutor.lastName} ${libraryAllTutor.rating}`}
                    </h5>
                    {libraryAllTutor.subjectLevels.map((subjectLevel)=>
                      <div>
                        {subjectLevel}
                      </div>
                    )}
                    <button className="btn btn--blue" onClick={()=> handleSchedule(libraryAllTutor)}>Schedule</button>
                    <button className="btn btn--blue" onClick={()=> handleProfile(libraryAllTutor)}>Profile</button>
                  </div>
                )}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)