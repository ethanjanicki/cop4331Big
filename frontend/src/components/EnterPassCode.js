import React, { useState } from 'react';

function EnterPassCode()
{

  var passCode;
  var newPassword;
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
    
const doReset = async event => 
{
    event.preventDefault();
    let code = parseInt(passCode.value, 10);



    if(newPassword.value.length < 1) {
        setMessage('Enter a new password');
    }

    else if(passCode.value.length < 1) {
        setMessage('Enter the verification code');
    }

    else
    {
        let obj = {passCode:code, newPass:newPassword.value};
    let js = JSON.stringify(obj);
    try
    {    
        const response = await fetch(buildPath('api/passwordReset'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        let res = JSON.parse(await response.text());
        if(res.good)
        {
            window.location.href = '/';
        }
        else
        {
            setMessage(res.error);
        }
    }
    catch(e)
    {
        alert(e.toString());
        return;
    }}    
};
    
    return(
      <div id="loginDiv">
        <h1 id="title">UCF Shoutout</h1>
        <form id="loginForm">
        <input type="text" className="loginText" id="loginName" placeholder="Password Reset Code" 
          ref={(c) => passCode = c} /> <br />
        <input type="password" className="loginText" id="loginPassword" placeholder="N ewPassword" 
          ref={(c) => newPassword = c} /> <br />
        <input type="submit" id="loginButton" className="buttons" value = "Reset Password" onClick={doReset} />
        </form>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default EnterPassCode;