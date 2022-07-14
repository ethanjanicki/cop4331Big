import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import RegRedirect from '../components/RegRedirect';

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