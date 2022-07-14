import React from 'react';

import PageTitle from '../components/PageTitle.js';
import LoggedInName from '../components/LoggedInName.js';
import CardUI from '../components/CardUI.js';

const CardPage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <CardUI />
        </div>
    );
}

export default CardPage;