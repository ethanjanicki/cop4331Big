import React, {useState} from 'react';

let currentState = 0;
var currentLocationName = '';

function MapScreen()
{
    const [data,setData] = useState([]);
    const [reviewText, setReviewText] = useState('');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    let firstName = ud.firstName;
    let lastName = ud.lastName;
    var searchQuery;

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

  const findLocations = async event => 
  {
      event.preventDefault();
      
      let obj = {search:searchQuery.value};
      let js = JSON.stringify(obj);
      try
      {
          const response = await fetch(buildPath('api/searchlocations'),
          {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          let txt = await response.text();
          let res = JSON.parse(txt);
          let _results = res.results;
          let tempArray = [];

          for( var i=0; i<(_results.length); i++ )
          {
              let name = _results[i];

              tempArray.push({name:name});
          }

          setData(tempArray);
          currentState = 0;
      }
      catch(e)
      {
          alert(e.toString());
      }
  };

  const doSearch = async event => 
    {
        event.preventDefault();
        
        let obj = {location:currentLocationName};
        let js = JSON.stringify(obj);
        try
        {
            const response = await fetch(buildPath('api/reviewsforspecificLocation'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
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
            }
            setData(tempArray);
            currentState = 1;
        }
        catch(e)
        {
            alert(e.toString());
        }
    };

    const addReview = async event => 
    {
        event.preventDefault();

        let obj = {user_id:userId,location:currentLocationName,review:reviewText};
        console.log(currentLocationName);
            let js = JSON.stringify(obj);
            try
            {    
                const response = await fetch(buildPath('api/addReview'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                let txt = await response.text();
                window.location.href = '/map'; 
                
            }
            catch(e)
            {
                alert(e.toString());
            }    
        
    };


    const setCurrentLocationName = (given) =>
    {
        currentLocationName = given;
        console.log(currentLocationName);
    }

    const setToAdd = () =>
    {
        currentState = 2;
        setData([currentLocationName]);
    }

    const handleMessageChange = event => {
        setReviewText(event.target.value);
  };

    




    return(
        <div id="mapScreenDiv">
           <form id="loginForm">
           <input type="text" className="searchText" id="search" placeholder="Search Locations" ref={(c) => searchQuery = c} /> <br />
            <input type="submit" id="showLocationsButton" className="buttons" value = "Show Locations" onClick={findLocations} />
            </form>

            <table className="searchResultTable" >
            {data.map((val, key) => {
                
                if(currentState == 0)
                {
                    return (
                        <tbody key={key}>
                        <tr className="topRowSearch">
                        <th className="searchOverrideTop searchTableTop"><u>{val.name}</u></th>
                        </tr>
                        <tr className="midRowSearch">
                        <td className="searchOverrideMid searchTableTop"><input type="button" className="buttons listButtons showRevBut" value="Show Reviews" onMouseEnter={()=>setCurrentLocationName(val.name)} onClick={doSearch}></input></td>
                        </tr>
                        <tr className="botRowSearch">
                        <td className="searchTableReview"><input type="button" className="buttons listButtons writeRevBut" value="Write a Review" onMouseEnter={()=>setCurrentLocationName(val.name)} onClick={()=>setToAdd()} ></input></td>
                        </tr>
                        <tr className="blankRowSearch"></tr>
                        </tbody>
                    )
                }
                else if(currentState == 1)
                {
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
                }
                else if(currentState == 2)
                {
                    return (
                        <tbody key={key}>
                        <tr className="topRowSearch">
                        <th className="searchOverrideTop searchTableTop">Review for <u>{val}</u></th>
                        </tr>
                        <tr className="midRowSearch">
                        <td className="searchOverrideMid searchTableTop"><textarea className="bigTextBox" placeholder="Your review..." onChange={handleMessageChange}></textarea></td>
                        </tr>
                        <tr className="botRowSearch">
                        <td className="searchTableReview"><input type="button" className="buttons listButtons showRevBut" id="review" value="Submit" onMouseEnter={()=>setCurrentLocationName(val)} onClick={addReview}></input></td>
                        </tr>
                        <tr className="blankRowSearch"></tr>
                        </tbody>
                    )
                }
            })}
            </table>
       </div>
      );
}

export default MapScreen;