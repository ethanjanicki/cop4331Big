import React from 'react';

function ProfileInfo()
{
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    let firstName = ud.firstName;
    let lastName = ud.lastName;
    const doLogout = event => 
    {
        event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/';
    };    
  return(
   <div id="profileInfoDiv">
   <span id="profileName">Logged in as <b>{firstName} {lastName}</b></span>
   <button type="button" id="logoutButton" className="buttons" 
     onClick={doLogout}> Log Out </button>
   </div>
  );
};

export default ProfileInfo;