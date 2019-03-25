const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.post('/api/search', (req, res) => {
  console.log(req.body)
  axios.get(`http://api.picsart.com/photos/search.json?q=${req.body.q}&limit=20`)
  .then(result => {
    //console.log(result.data.response)
    res.send({ data: result.data.response });
  })
  .catch(err => console.log(`Error ${err}`))
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
