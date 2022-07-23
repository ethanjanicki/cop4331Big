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
            const response = await fetch(buildPath('api/userreviews'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            let locationName = '';
            for( var i=0; i<(_results.length); i++ )
            {
                let location_id = _results[i].location_id;
                let tempReview = _results[i].review;

                let obj2 = {location_id:location_id};
                let js2 = JSON.stringify(obj2);
                try
                {
                    const response = await fetch(buildPath('api/nameofLocation'),
                    {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});
                    let txt2 = await response.text();
                    let res2 = JSON.parse(txt2);
                    let _results2 = res2.results;
                    let resultText2 = '';
                    for( var j=0; j<(_results2.length); j++ )
                    {
                        resultText2 += _results2[j];
                        if( j < (_results2.length - 1) )
                        {
                            resultText2 += ', ';
                        }
                    }
                    locationName = resultText2;
                }
                catch(e)
                {
                    alert(e.toString());
                }


                resultText += locationName + " " + tempReview;
                if( i < (_results.length - 1) )
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

    /*const findLocationName = async event => 
    {
        event.preventDefault();
        
        let obj = {location_id:location_id};
        let js = JSON.stringify(obj);
        try
        {
            const response = await fetch(buildPath('api/nameofLocation'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for( var i=0; i<(_results.length); i++ )
            {
                resultText += _results[i];
                if( i < (_results.length - 1) )
                {
                    resultText += ', ';
                }
            }
            giveName(resultText);
        }
        catch(e)
        {
            alert(e.toString());
        }
    };*/

    return(
        <div id="userReviewsDiv">
            <input type="button" id="loadReviewsButton" className="buttons" value = "Show My Reviews" onClick={searchUserReviews} />
            <p id="reviewList">{reviewList}</p><br /><br />
        </div>
        );
};

export default UserReviewTable;