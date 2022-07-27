const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');           
const PORT = process.env.PORT || 5000;  

const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const crypto = require('crypto');
client.connect();

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
  let error = '';
  const { login, password } = req.body;
  const db = client.db("Review_App");
  const results = await 
db.collection('Users').find({login:login,password:password}).toArray();
  let id = -1;
  let fn = '';
  let ln = '';
  if( results.length > 0 )
  {
    id = results[0].user_id;
    fn = results[0].first_name;
    ln = results[0].last_name;
    iv = results[0].isVerified;
  }
  let ret = { id:id, firstName:fn, lastName:ln, isVerified:iv, error:''};
  res.status(200).json(ret);
});

/*app.post('/api/registerUser', async (req, res, next) =>
{
  // incoming: first_name, last_name, login, password, email
  // outgoing: error
	
  const { first_name,last_name,login,password,email,isVerified,emailToken } = req.body;

  isVerified=false;
  emailToken=crypto.randomBytes(64).toString('hex');

  const newUser= {first_name:first_name,last_name:last_name,login:login,password:password,email:email,isVerified:isVerified,emailToken:emailToken};
  let error = '';

  try
  {
    const db = client.db("COP43310-Summer22-2");
    const result = db.collection('Users').insertOne(newUser);
  }
  catch(e)
  {
    error = e.toString();
  }

  //cardList.push( card );

  let ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/sendemail', async (req, res, next) =>
{
  // incoming: first_name, last_name, login, password, email
  // outgoing: error
	
  const { first_name,last_name,login,password,email } = req.body;

  const newUser= {first_name:first_name,last_name:last_name,login:login,password:password,email:email};
  let error = '';

  try
  {
    require('dotenv').config()
    const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const msg = {
        to: 'kduvall011@gmail.com', // Change to your recipient
        from: 'cop4331group18@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
  }
  catch(e)
  {
    error = e.toString();
  }

  //cardList.push( card );

  let ret = { error: error };
  res.status(200).json(ret);
});
*/

app.post('/api/registerUser', async (req, res, next) =>
{
  // incoming: first_name, last_name, login, password, email
  // outgoing: error
	
  const { first_name,last_name,login,password,email } = req.body;

  const newUser= {first_name:first_name,last_name:last_name,login:login,password:password,email:email};
  let error = '';

  try
  {
    const db = client.db("Review_App");
    const result = db.collection('Users').insertOne(newUser);
  }
  catch(e)
  {
    error = e.toString();
  }

  //cardList.push( card );

  let ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/verifyAccount', async (req, res, next) =>
{
  let error = '';

  const { verCode } = req.body;
  
  const db = client.db("Review_App");
  const results = await db.collection('Users').find({verCode:verCode}).toArray();
  let ret = {};
  
  if(results.length < 1)
  {
    ret = {good:false, error:'Code is incorrect'};
  }
  else {
    for( var i=0; i<results.length; i++ )
  {
    let tempId = results[i].user_id;
    let tempFirst = results[i].first_name;
    let tempLast = results[i].last_name;
    let tempLogin = results[i].login;
    let tempPass = results[i].password;
    let tempEmail = results[i].email;
    let tempCode = results[i].verCode;

    const newUser= {user_id:tempId,first_name:tempFirst,last_name:tempLast,login:tempLogin,password:tempPass,email:tempEmail,isVerified:true,verCode:tempCode};


    try
    {
      const result = db.collection('Users').deleteOne({verCode:verCode});
      const result2 = db.collection('Users').insertOne(newUser);
    }
    catch(e)
    {
      error = e.toString;
    }
  }
  
  ret = {good:true, error:error};
  }
  res.status(200).json(ret);
});

app.post('/api/deleteReview', async (req, res, next) =>
{
  // incoming: userId, review
  // outgoing: error
	
  const {user_id,review_id} = req.body;
  let error = '';
  //const newReview = {user_id:user_id,location_id:location_id,review:review};
  const db = client.db("Review_App");
  try
  {
    
    const result = db.collection('Reviews').deleteOne({review_id:review_id});
  }
  catch(e)
  {
    error = e.toString;
  }

  const results = await db.collection('Reviews').find({user_id:user_id}).toArray();
  
  let _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    let temp={location:results[i].location,review:results[i].review,review_id:results[i].review_id};
    _ret.push( temp );
  }
  
  let ret = {results:_ret, error:error};
  
  //let error = '';
  //let ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/registerUserNew', async (req, res, next) =>
{
  // incoming: first_name, last_name, login, password, email
  // outgoing: error
	
  const { first_name,last_name,login,password,email } = req.body;

  let verCode = 10000 + Math.floor(Math.random() * (99999 - 10000));

  const newUser= {first_name:first_name,last_name:last_name,login:login,password:password,email:email,isVerified:false,verCode:verCode};
  let error = '';

  try
  {
    const db = client.db("Review_App");
    const result = db.collection('Users').insertOne(newUser);
  }
  catch(e)
  {
    error = e.toString();
  }

  try
  {
    require('dotenv').config()
    const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const msg = {
        to: email, // Change to your recipient
        from: 'cop4331group18@gmail.com', // Change to your verified sender
        subject: 'UCF Shoutout Account Verification',
        text: 'Your verification code is: ' + verCode,
        html: '<strong>Your verification code is: ' + verCode + '</strong>',
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
  }
  catch(e)
  {
    error = e.toString();
  }

  //cardList.push( card );

  let ret = { error: error };
  res.status(200).json(ret);
});

/*app.post('/api/sendemail', async (req, res, next) =>
{
  // incoming: first_name, last_name, login, password, email
  // outgoing: error
	
  const { first_name,last_name,login,password,email } = req.body;

  const newUser= {first_name:first_name,last_name:last_name,login:login,password:password,email:email};
  let error = '';

  try
  {
    require('dotenv').config()
    const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const msg = {
        to: 'kduvall011@gmail.com', // Change to your recipient
        from: 'cop4331group18@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
  }
  catch(e)
  {
    error = e.toString();
  }

  //cardList.push( card );

  let ret = { error: error };
  res.status(200).json(ret);
});
*/

app.post('/api/searchlocations', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  let error = '';

  const { search } = req.body;

  let _search = search.trim();
  
  const db = client.db("Review_App");
  const results = await db.collection('locations').find({"name":{$regex:_search+'.*', $options:'r'}}).toArray();
  
  let _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].name );
  }
  
  let ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

app.post('/api/searchReviews', async (req, res, next) => 
{
  // incoming: search
  // outgoing: results[], error

  let error = '';

  const { search } = req.body;

  let _search = search.trim();
  
  const db = client.db("Review_App");
  const results = await db.collection('Reviews').find({"location":{$regex:_search+'.*', $options:'r'}}).toArray();
  
  let _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    let temp={location:results[i].location,review:results[i].review,user_id:results[i].user_id};
    _ret.push( temp );
  }
  
  let ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

app.post('/api/searchUsers', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
  const {user_id} = req.body;
  let error = '';
  const db = client.db("Review_App");
  
  const results = await db.collection('Users').find({user_id:user_id}).toArray();
  
  let _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    let temp={first_name:results[i].first_name,last_name:results[i].last_name};
    _ret.push( temp );
  }
  
  let ret = {results:_ret, error:error};
  
  //let error = '';
  //let ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/reviewsforspecificLocation', async (req, res, next) =>
{
  const {location} = req.body;
  let error = '';

  const db = client.db("Review_App");

  const results = await db.collection('Reviews').find({location:location}).toArray();

  let ret = {results:results, error:error};

  res.status(200).json(ret);
});

app.post('/api/namefromid', async (req, res, next) =>
{

  const {user_id} = req.body;
  let error = '';

  const db = client.db("Review_App");

  const results = await db.collection('Users').find({user_id:user_id}).toArray();


  let ret = {results:results, error:error};

  res.status(200).json(ret);
});

app.post('/api/addReview', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
	
  const { user_id, location, review } = req.body;

  const newReview = {user_id:user_id,location:location,review:review};
  let error = '';

  try
  {
    const db = client.db("Review_App");
    const result = db.collection('Reviews').insertOne(newReview);
  }
  catch(e)
  {
    error = e.toString();
  }

  //cardList.push( card );

  let ret = { error: error };
  res.status(200).json(ret);
});




//functional
app.post('/api/reviewsforLocation', async (req, res, next) =>
{
  // incoming: userId, review
  // outgoing: error
	
  const {location_id} = req.body;
  let error = '';
  //const newReview = {user_id:user_id,location_id:location_id,review:review};
  const db = client.db("Review_App");
  
  const results = await db.collection('Reviews').find({location_id:location_id}).toArray();
  
  let _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].review );
  }
  
  let ret = {results:_ret, error:error};
  
  //let error = '';
  //let ret = { error: error };
  res.status(200).json(ret);
});



app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
  const { userId, card } = req.body;
  const newCard = {Card:card,user_id:user_id};
  let error = '';
  try
  {
    const db = client.db("Review_App");
    const result = db.collection('Cards').insertOne(newCard);
  }
  catch(e)
  {
    error = e.toString();
  }
  //cardList.push( card );
  let ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/userreviews', async (req, res, next) =>
{
  // incoming: userId, review
  // outgoing: error
	
  const {user_id} = req.body;
  let error = '';
  //const newReview = {user_id:user_id,location_id:location_id,review:review};
  const db = client.db("Review_App");
  
  const results = await db.collection('Reviews').find({user_id:user_id}).toArray();
  
  let _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    let temp={location:results[i].location,review:results[i].review,review_id:results[i].review_id};
    _ret.push( temp );
  }
  
  let ret = {results:_ret, error:error};
  
  //let error = '';
  //let ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/nameofLocation', async (req, res, next) =>
{
  // incoming: userId, review
  // outgoing: error
	
  const {location_id} = req.body;
  let error = '';
  //const newReview = {user_id:user_id,location_id:location_id,review:review};
  const db = client.db("Review_App");
  
  const results = await db.collection('locations').find({location_id:location_id}).toArray();
  
  let _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].name );
  }
  
  let ret = {results:_ret, error:error};
  
  //let error = '';
  //let ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error
  let error = '';
  const { user_id, search } = req.body;
  let _search = search.trim();
  
  const db = client.db("Review_App");
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
  
  let _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  
  let ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});