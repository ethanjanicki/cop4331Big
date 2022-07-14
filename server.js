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
client.connect();

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
  let error = '';
  const { login, password } = req.body;
  const db = client.db("COP43310-Summer22-2");
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
  }
  let ret = { id:id, firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);
});


app.post('/api/registerUser', async (req, res, next) =>
{
  // incoming: first_name, last_name, login, password, email
  // outgoing: error
	
  const { first_name,last_name,login,password,email } = req.body;

  const newUser= {first_name:first_name,last_name:last_name,login:login,password:password,email:email};
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


app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
  const { userId, card } = req.body;
  const newCard = {Card:card,user_id:user_id};
  let error = '';
  try
  {
    const db = client.db("COP43310-Summer22-2");
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

app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error
  let error = '';
  const { user_id, search } = req.body;
  let _search = search.trim();
  
  const db = client.db("COP43310-Summer22-2");
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