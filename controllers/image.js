const handleImage = (req, res, db) => {
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
}

module.exports = {
    handleImage: handleImage
}