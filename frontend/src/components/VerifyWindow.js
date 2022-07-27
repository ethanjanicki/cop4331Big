import React, { useState } from 'react';

function VerifyWindow()
{
  var verifCode;
  const [message,setMessage] = useState('');

  const app_name = 'cop4331-5555'
  function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}
    
  const doVerify = async event => 
    {
        event.preventDefault();
        let code = parseInt(verifCode.value, 10);
        let obj = {verCode:code};
        let js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(buildPath('api/verifyAccount'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let res = JSON.parse(await response.text());
            if(!res.good)
            {
                setMessage(res.error);
            }
            else
            {
                window.location.href = '/';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
      <div id="loginDiv">
        <h1 id="title">Check Email for Verification Code</h1>
        <form id="loginForm">
        <input type="text" className="loginText" id="loginName" placeholder="Verification Code" 
          ref={(c) => verifCode = c} /> <br />
        <input type="submit" id="loginButton" className="buttons" value = "Verify" onClick={doVerify} />
        </form>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default VerifyWindow;