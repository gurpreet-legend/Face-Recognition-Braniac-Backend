const handleSignIn = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    db.select('email', 'hash').from('login')
        .where({email: email})
        .then(async (userInfo) => {
            const isValid = await bcrypt.compare(password, userInfo[0].hash);
            if(isValid){
                return db.select('*').from('users')
                .where({email: email})
                .then(user => {
                    res.status(200).json(user[0])
                })
                .catch(err => res.status(400).json('Unable to get user !'))
            }
            else {
                res.status(400).json('Wrong credentials');
            }
        })
        .catch(err => res.status(400).json('Wrong credentials'));
}

module.exports = {
    handleSignIn: handleSignIn
}