import React from 'react';

import PageTitle from '../components/PageTitle.js';
import Login from '../components/Login.js';
import RegRedirect from '../components/RegRedirect.js';

const LoginPage = () =>
{
    return(
      <div id="loginBox">
        <PageTitle />
        <Login />
        <RegRedirect />
      </div>
    );
};

export default LoginPage;