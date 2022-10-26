const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({
      id: id,
    })
    .then((user) => {
      if (user.length > 0) {
        //We check here for length greater than 0, as otherwise it returns an empty array
        res.status(200).json(user[0]);
      } else {
        res.status(404).json('User does not exist in the database !');
      }
    })
    .catch((err) => res.status(404).json('Error founding user !'));
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
