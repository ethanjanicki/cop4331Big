import React, {useState} from 'react';
import ReactMapGL from "react-map-gl";

import NavBar from '../components/NavBar.js';

const MapPage2 = () =>
{
  const [viewport, setviewport] = useState({
      latitude: 28.6024,
      longitude: 81.2001,
      width: '100vw',
      height: '100vh',
      zoom: 10,
  });

    return(
      <div id="mapBox">

        <NavBar />
        <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
            markers here
        </ReactMapGL>

      </div>
    );
};

export default MapPage2;