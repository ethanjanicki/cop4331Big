import React, { useState } from 'react';

function Register()
{

  var loginName;
  var loginPassword;
  var first_name;
  var last_name;
  var email;
  var confirm_email;
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
    
  const doRegister = async event => 
    {
        event.preventDefault();
        if(first_name.value.length < 1 || last_name.value.length < 1 || loginName.value.length < 1 || loginPassword.value.length < 1 || email.value.length < 1 || confirm_email.value.length < 1)
        {
            setMessage('Fill in all fields');
        }


        else if(email.value!==confirm_email.value)
        {
            setMessage('Emails must match');
        }

        else {
            let obj = {first_name:first_name.value,last_name:last_name.value,login:loginName.value,password:loginPassword.value,email:email.value};
            let js = JSON.stringify(obj);
            try
            {    
                const response = await fetch(buildPath('api/registerUser'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                let res = JSON.parse(await response.text());
                if( res.id <= 0 )
                {
                    setMessage('Failure');
                }
                else
                {
                    setMessage('');
                    window.location.href = '/';
                }
            }
            catch(e)
            {
                alert(e.toString());
                return;
            }    
        }
    };

    const doLoginRedirect = async event => 
    {
        window.location.href = '/';  
    };
    
    return(
      <div id="registerDiv">
        <h1 id="title">UCF Shoutout</h1>
        <form onSubmit={doRegister}>
        <input type="text" className="regText" id="firstName" placeholder="First Name" ref={(c) => first_name = c} /> 
        <input type="text" className="regText" id="lastName" placeholder="Last Name" ref={(c) => last_name = c} /> <br />
        <input type="text" className="regText" id="regName" placeholder="Username" ref={(c) => loginName = c} /> 
        <input type="password" className="regText" id="regPassword" placeholder="Password" ref={(c) => loginPassword = c} /> <br />
        <input type="text" className="regText" id="regEmail" placeholder="Email" ref={(c) => email = c} /> 
        <input type="text" className="regText" id="regConfirmEmail" placeholder="Confirm Email" ref={(c) => confirm_email = c} /> <br />
        <input type="submit" id="loginButton" className="buttons" value = "Register" onClick={doRegister} />
        </form>
        <span id="loginResult">{message}</span>
        <div id="loginRedirectDiv">
            <input type="button" id="loginRedirectButton" className="buttons" value = "Have an account? Log in here!" onClick={doLoginRedirect} />
        </div>
     </div>
    );
};

export default Register;