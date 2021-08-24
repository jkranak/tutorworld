import React, {useState, useEffect} from 'react'
import Map from './Map';
import {getAllLibraries} from '../services/apiMaps';

const Location = () => {

  return (
    <div>
      <div>
        Location component
      </div>
      <Map />
    </div>
  )
}

export default Location

