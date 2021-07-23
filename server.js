const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');

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
    ]
}


app.get('/', (req,res) => {
    res.send(database.users);
})

app.post('/signin', (req,res) => {
    if(req.body.email == database.users[0].email && req.body.password == database.users[0].password){
        console.log(req.body);
        res.status(200).json('You are signed in.');
    }else {
        res.status(400).json('Some error occured');
    }
})


app.post('/register', (req,res) => {
    const {name, email,password} = req.body;
    database.users.push({
        id:'124',
        name: name,
        email: email,
        password: password,
        enteries: 0,
        joined: new Date()
    }) 
    res.status(200).send('Registered sucuccesfully');
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
    // filteredUser = database.users.filter(user => user.id == id);
    // if(filteredUser.length > 0){
    //     res.json(filteredUser[0]);
    // }
    // else{
    //     res.json('User does not exist in the database');
    // }
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
    console.log(`Server is running at port ${port}`);
})

//Structuring :
/*
/ --> res = this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userID = --> GET =user
/image --> PUT --> user
*/