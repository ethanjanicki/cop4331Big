import React from 'react';

import NavBar from '../components/NavBar.js';
import ProfileInfo from '../components/ProfileInfo.js';
import UserReviewTable from '../components/UserReviewTable.js';

const ProfilePage = () =>
{
    return(
      <div id="profileBox">

        <NavBar />
        <ProfileInfo />
        <UserReviewTable />

      </div>
    );
};

export default ProfilePage;