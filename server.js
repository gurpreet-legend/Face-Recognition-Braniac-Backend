const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const database = {
    users: [
        {
            id:'123',
            name: 'Mikasa',
            email: 'eren@gmail.com',
            password: 'iLoveEren',
            enteries: 0,
            joined: new Date()
        },
        {
            id:'124',
            name: 'Eren',
            email: 'Shiganshina@gmail.com',
            password: 'foundinTitan',
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
    res.send(database.users);
})

app.post('/signin', async (req,res) => {
    const user = database.users.find(user => user.email == req.body.email)
    if(user == null){
        return res.status(400).json("Cannot find user");
    }
    if(await bcrypt.compare(req.body.password, user.password)){
        res.status(200).json('You are signed in');
    } else {
        res.status(400).json('password / user combination does not match');
    }
    // if(req.body.email == database.users[0].email && req.body.password == database.users[0].password){
    //     console.log(req.body);
    //     res.status(200).json('You are signed in.');
    // }else {
    //     res.status(400).json('Some error occured');
    // }
})


app.post('/register', async (req,res) => {
    const {name, email,password} = req.body;
    let hash_password = await bcrypt.hash(password, 10);
    database.users.push({
        id:'130',
        name: name,
        email: email,
        password: hash_password,
        enteries: 0,
        joined: new Date()
    }) 
    res.status(200).send(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{
        if(user.id == id){
            found = true
            return res.status(200).json(user);
        }
    });
    if(!found){
        res.status(400).json('User does not exist in the database');
    }
})

app.post('/image', (req,res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user =>{
        if(user.id == id){
            found = true;
            user.enteries++;
            return res.json(user.enteries);
        }
    });
    if(!found){
        res.json('User does not exist in the database');
    }
})



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
