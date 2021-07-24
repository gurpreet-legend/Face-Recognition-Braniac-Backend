const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'losty',
      password : 'lostworld2701',
      database : 'brainiacDB'
    }
});

db.select('*').from('users').then(data => {
    console.log(data)
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

const database = {
    users: [
        {
            id:'123',
            name: 'Mikasa',
            email: 'mikasa@gmail.com',
            password: 'eren',
            enteries: 0,
            joined: new Date()
        },
        {
            id:'124',
            name: 'Eren',
            email: 'Shiganshina@gmail.com',
            password: 'foundingTitan',
            enteries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id:'789',
            hash:'',
            email:'test@gmail.com'
        }
    ]
}


app.get('/', (req,res) => {
    res.json(database.users);
})

app.post('/signin',(req,res) => {
    const user = database.users.find(user => user.email == req.body.email)
    if(user == null){
        return res.status(404).json("Cannot find user");
    }
    // if(await bcrypt.compare(req.body.password, user.password)){
    //     res.status(200).json('Success');
    // } else {
    //     res.status(400).json('password / user combination does not match');
    // }
    if(req.body.email == user.email && req.body.password == user.password){
        res.status(200).json(user);
    }else {
        res.status(400).json('password / user combination does not match');
    }
})


app.post('/register', async (req,res) => {
    const {name, email,password} = req.body;
    let hash_password = await bcrypt.hash(password, 10);
    //Implementing transactions concept for Login and User DB
    db.transaction(trx => {
        trx.insert({
            hash: hash_password, 
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            db('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date()
                })
                .then(user => {
                    res.status(200).json(user[0]); 
                })
                .catch(err => res.status(400).json("Unable to register"))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }) 
})

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if(user.length > 0)  //We check here for length greater than 0, as otherwise it returns an empty array
        { 
            res.status(200).json(user[0]);
        }
        else{
            res.status(404).json("User does not exist in the database !")
        }
    })
    .catch(err => res.status(404).json("Error founding user !"))
})

app.put('/image', (req,res) => {
    const {id} = req.body;
    db.select('*').from('users').where('id', '=', id)
    .increment('enteries', 1)
    .returning('enteries')
    .then(enteries => {
        if(enteries.length > 0) {
            res.status(200).json(enteries[0]);
        }
        else{
            res.json('Unable to get entries');
        }
    })
    .catch(err => res.status(404).json("Error founding entries !"))
})



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
