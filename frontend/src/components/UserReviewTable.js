import React, { useState } from 'react';
import { confirm } from "react-confirm-box";

function UserReviewTable()
{
    const [reviewList,setReviewList] = useState('');
    const [data,setData] = useState([]);

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    let firstName = ud.firstName;
    let lastName = ud.lastName;
    var currentReviewId = 0;

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
            let tempArray = [];

            for( var i=0; i<(_results.length); i++ )
            {
                let location = _results[i].location;
                let tempReview = _results[i].review;
                tempArray.push(_results[i]);

                //resultText += review_id + " " + locationName + " " + tempReview;
                //resultText += `${review_id} ${locationName} ${tempReview}`;
                //resultText += `<tr><td>${locationName}</td></tr><td>${tempReview}</td><tr>`;
                resultText += "<tr><td>" + location + "</td></tr><td>" + tempReview + "</td><tr>";
                if( i < (_results.length - 1) )
                {
                    resultText += ', ';
                }
            }
            setReviewList(resultText);
            setData(tempArray);
        }
        catch(e)
        {
            alert(e.toString());
        }
    };



   const deleteReview = async event => 
    {
        event.preventDefault();

        const alertResult = await confirm("Are you sure you want to delete this review?");
        if (!alertResult) {
            return;
        }
        
        let obj = {user_id:userId,review_id:currentReviewId};
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/deleteReview'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            let tempArray = [];

            for( var i=0; i<(_results.length); i++ )
            {
                let location = _results[i].location;
                let tempReview = _results[i].review;
                tempArray.push(_results[i]);

                //resultText += review_id + " " + locationName + " " + tempReview;
                //resultText += `${review_id} ${locationName} ${tempReview}`;
                //resultText += `<tr><td>${locationName}</td></tr><td>${tempReview}</td><tr>`;
                resultText += "<tr><td>" + location + "</td></tr><td>" + tempReview + "</td><tr>";
                if( i < (_results.length - 1) )
                {
                    resultText += ', ';
                }
            }
            setReviewList(resultText);
            setData(tempArray);
        }
        catch(e)
        {
            alert(e.toString());
        }
    }

    const setCurrentReviewId = (given) =>
    {
        currentReviewId = given;
    }

    

    return(
        <div id="userReviewsDiv">
            <input type="button" id="loadReviewsButton" className="buttons" value = "Show My Reviews" onClick={searchUserReviews} />

            <table className="userReviewsTable" >
            {data.map((val, key) => {
                
            return (
                <tbody key={key}>
                <tr className="topRow">
                <th className="userTableOverrideTop userTableWidth"><u>{val.location}</u></th>
                <th className="userTableOverrideTop" ><input type="button" className="buttons deleteButtons" value="Delete" onMouseEnter={()=>setCurrentReviewId(val.review_id)} onClick={deleteReview}></input></th>
                </tr>
                <tr className="botRow">
                <td className="userTableOverrideBot userTableWidth">"{val.review}"</td>
                <td className="userTableOverrideBot"></td>
                </tr>
                <tr className="blankRow"></tr>
                </tbody>
            )
            })}
            </table>
        </div>
        );
};

export default UserReviewTable;