import React from 'react';

function RegRedirect()
{

  const doRegRedirect = async event => 
    {
        window.location.href = '/register';  
    };
    
    return(
      <div id="regRedirectDiv">
        <input type="button" id="regRedirectButton" className="buttons" value = "New user? Register here!" onClick={doRegRedirect} />
     </div>
    );
};

export default RegRedirect;