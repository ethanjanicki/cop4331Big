import React, { useState } from 'react';

function EnterEmail()
{
  var emailEntry;
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
    
  const doEmail = async event => 
    {
        event.preventDefault();
        console.log(emailEntry);
        let obj = {email:emailEntry.value};
        let js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(buildPath('api/sendResetEmail'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let res = JSON.parse(await response.text());
            if(!res.exists)
            {
                setMessage(res.error);
            }
            else
            {
                window.location.href = '/resetsent';
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
        <h1 id="title">Enter your email to reset password</h1>
        <form id="loginForm">
        <input type="text" className="loginText" id="loginName" placeholder="Email" ref={(c) => emailEntry = c} /> <br />
        <input type="submit" id="loginButton" className="buttons" value = "Send Email" onClick={doEmail} />
        </form>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default EnterEmail;