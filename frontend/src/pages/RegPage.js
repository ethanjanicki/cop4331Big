import React from 'react';

import PageTitle from '../components/PageTitle.js';
import Register from '../components/Register.js';
import LoginRedirect from '../components/LoginRedirect.js';

const RegPage = () =>
{
    return(
      <div id="regBox">
        <PageTitle />
        <Register />
        <LoginRedirect />
      </div>
    );
};

export default RegPage;