import React from 'react';

import NavBar from '../components/NavBar.js';
import ListSearch from '../components/ListSearch.js';

const ListPage = () =>
{
    return(
      <div id="listBox">

        <NavBar />
        <ListSearch />

      </div>
    );
};

export default ListPage;