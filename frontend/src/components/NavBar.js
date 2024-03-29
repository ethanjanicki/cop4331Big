import React from 'react';

function NavBar()
{

    const goToMap = async event => 
    {
        window.location.href = '/map';  
    };
    const goToList = async event => 
    {
        window.location.href = '/list';  
    };
    const goToProfile = async event => 
    {
        window.location.href = '/profile';  
    };
    
    return(
        <nav className="nav main-nav">
            <ul>
                <li><a id="mapBar" onClick={goToMap}>Search Locations</a></li>
                <li><a id="listBar" onClick={goToList}>Tag Search</a></li>
                <li><a id="profileBar" onClick={goToProfile}>Profile Page</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;