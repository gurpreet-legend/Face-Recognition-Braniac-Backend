//ML Model Import
const Clarifai = require('clarifai');

//Creating a Clarifai App
const app = new Clarifai.App({
    apiKey: "ae99589fa35f4d3fa4c813c2186a2e00", //ADD IT TO .env file LATER !!!!!!!
});

const handleApiCall = (req, res) => {
    app.models
          .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
          .then(data => {
              res.json(data);
          })
          .catch(err => res.status(400).json(`API doesn't work`))
}

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
    handleImage,
    handleApiCall
}