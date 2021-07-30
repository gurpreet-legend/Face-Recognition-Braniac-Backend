const handleSignIn = (req, res, db, bcrypt) => {
    //AUTHENTICATION
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('Incorrect form submission');
    }
    db.select('email', 'hash').from('login')
    .where({email: email})
    .then(async (userInfo) => {
        const reqUser = userInfo[0];
        const isValid = await bcrypt.compare(password, reqUser.hash);
        if(isValid){
            // JWT AUTHORIZATION
            const reqUser = {email: email, password: password};
            accessToken = jwt.sign(reqUser, process.env.ACCESS_TOKEN_SECRET, (err, tokenID) => {
                return db.select('*').from('users')
                .where({email: email})
                .then(user => {
                    res.status(200).json(user[0])
                })
                .catch(err => res.status(400).json('Unable to get user !'))
            });
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