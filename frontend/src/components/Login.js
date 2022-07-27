import React, { useState } from 'react';

function Login()
{

  var loginName;
  var loginPassword;
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
    
  const doLogin = async event => 
    {
        event.preventDefault();
        let obj = {login:loginName.value,password:loginPassword.value};
        let js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else if(!res.isVerified) 
            {
                setMessage('Account is not verified');
            }
            else
            {
                let user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/profile';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    const doRegRedirect = async event => 
    {
        window.location.href = '/register';  
    };

    /*const doEmail = async event =>
    {
      event.preventDefault();
      let obj = {login:loginName.value,password:loginPassword.value};
        let js = JSON.stringify(obj);
      try
        {    
            const response = await fetch(buildPath('api/sendemail'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
                setMessage('Email failure?');
            }
            else
            {
                setMessage('Email success?');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }*/
    
    return(
      <div id="loginDiv">
        <h1 id="title">UCF Shoutout</h1>
        <form id="loginForm" onSubmit={doLogin}>
        <input type="text" className="loginText" id="loginName" placeholder="Username" 
          ref={(c) => loginName = c} /> <br />
        <input type="password" className="loginText" id="loginPassword" placeholder="Password" 
          ref={(c) => loginPassword = c} /> <br />
        <input type="submit" id="loginButton" className="buttons" value = "Log In" onClick={doLogin} />
        </form>
        <span id="loginResult">{message}</span>
        <div id="regRedirectDiv">
            <input type="button" id="regRedirectButton" className="buttons" value = "New user? Register here!" onClick={doRegRedirect}/>
        </div>
     </div>
    );
};

export default Login;