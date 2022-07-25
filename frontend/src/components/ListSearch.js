import React, { useState } from 'react';

function ListSearch()
{
    const [reviewList,setReviewList] = useState('');
    const [data,setData] = useState([]);

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    var searchQuery;
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

    const doSearch = async event => 
    {
        event.preventDefault();
        
        let obj = {search:searchQuery.value};
        let js = JSON.stringify(obj);
        try
        {
            const response = await fetch(buildPath('api/searchReviews'),
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
                let tempId = _results[i].user_id;
                let tempFirst = "";
                let tempLast = "";

                let obj2 = {user_id:tempId};
        
                let js2 = JSON.stringify(obj2);
                try
                {
                    const response2 = await fetch(buildPath('api/searchUsers'),
                    {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});
                    let txt2 = await response2.text();
                    let res2 = JSON.parse(txt2);
                    let _results2 = res2.results;


                    tempFirst = _results2[0].first_name;
                    tempLast = _results2[0].last_name;

                }
                catch(e)
                {
                    alert(e.toString());
                }


                tempArray.push({location:location,review:tempReview,first_name:tempFirst,last_name:tempLast});

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


    

    

    return(
        <div id="listSearchDiv">
            <form id="loginForm" onSubmit={doSearch}>
            <input type="text" className="searchText" id="search" placeholder="Search Reviews" ref={(c) => searchQuery = c} /> <br />
            <input type="submit" id="searchButton" className="buttons" value = "Search" onClick={doSearch} />
            </form>

            <table className="searchResultTable" >
            {data.map((val, key) => {
                
            return (
                <tbody key={key}>
                <tr className="topRowSearch">
                <th className="searchOverrideTop searchTableTop"><u>Location: {val.location}</u></th>
                </tr>
                <tr className="midRowSearch">
                <td className="searchOverrideMid searchTableTop">User: <i>{val.first_name} {val.last_name}</i></td>
                </tr>
                <tr className="botRowSearch">
                <td className="searchTableReview">"{val.review}"</td>
                </tr>
                <tr className="blankRowSearch"></tr>
                </tbody>
            )
            })}
            </table>
        </div>
        );
};

export default ListSearch;