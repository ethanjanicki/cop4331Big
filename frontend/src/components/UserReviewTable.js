import React, { useState } from 'react';

function UserReviewTable()
{
    const [reviewList,setReviewList] = useState('');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    let firstName = ud.firstName;
    let lastName = ud.lastName;

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

    const searchUserReviews = async event => 
    {
        event.preventDefault();
        
        let obj = {user_id:userId};
        let js = JSON.stringify(obj);
        try
        {
            const response = await fetch(buildPath('api/userReviews'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for( var i=0; i<_results.length; i++ )
            {
                resultText += _results[i];
                if( i < _results.length - 1 )
                {
                    resultText += ', ';
                }
            }
            setReviewList(resultText);
        }
        catch(e)
        {
            alert(e.toString());
        }
    };

    return(
        <div id="userReviewsDiv">
            <p id="reviewList">{reviewList}</p><br /><br />
        </div>
        );
};

export default UserReviewTable;