import React, {useState} from 'react';
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"

function MapScreen()
{
    const{ isLoaded } = useLoadScript({googleMapsApiKey:process.env.REACT_APP_GOOGLE_KEY});

    if(!isLoaded) return <div>Loading...</div>




    return(
        <div id="mapScreenDiv">
           Map
       </div>
      );
}

export default MapScreen;