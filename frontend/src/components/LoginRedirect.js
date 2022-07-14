import React from 'react';

function LoginRedirect()
{

  const doLoginRedirect = async event => 
    {
        window.location.href = '/';  
    };
    
    return(
      <div id="loginRedirectDiv">
        <input type="button" id="loginRedirectButton" className="buttons" value = "Have an account? Log in here!" onClick={doLoginRedirect} />
     </div>
    );
};

export default LoginRedirect;