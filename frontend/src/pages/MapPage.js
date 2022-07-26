import React from 'react';

import NavBar from '../components/NavBar.js';
import MapScreen from '../components/MapScreen.js';

const MapPage = () =>
{
    return(
      <div id="mapBox">

        <NavBar />
        <MapScreen />

      </div>
    );
};

export default MapPage;