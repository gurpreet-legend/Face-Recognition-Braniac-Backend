const handleRegister = async (req, res, db, bcrypt) => {
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
}

module.exports = {
    handleRegister: handleRegister
}