const express = require('express');
const bodyParser = require('body-parser');
const { Tent, Shirt, db } = require('../db/index.js');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/data/shirts', (req, res) => {
  Shirt.aggregate([ { $sample: { size: 6 } } ]).exec((err, data) => {
    if (err) {
      console.log('Server Error', err);
    } else {
      res.status(200).send(data);
    }
  })
});

app.get('/data/tents', (req, res) => {
  Tent.aggregate([ { $sample: { size: 6 } } ]).exec((err, data) => {
    if (err) {
      console.log('Server Error', err);
    } else {
      res.status(200).send(data);
    }
  })
});

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});