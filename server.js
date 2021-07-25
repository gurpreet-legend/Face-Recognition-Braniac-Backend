const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//knex initilization of database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'losty',
      password : 'lostworld2701',
      database : 'brainiacDB'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


app.get('/', (req,res) => res.json('Server is working.'))
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req,res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
