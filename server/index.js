const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Tent, Shirt } = require('../db/index.js');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

Tent.create({
  _id: 1,
  imageURL: 'https://source.unsplash.com/1600x900/?tent',
  title: "Tent Test",
  ranking: 4.5,
  reviews: 170,
  price: 278.90,
  sleepingCapacity: '6-people',
  packagedWeight: '19 lbs. 12 ox.',
  NumberOfDoors: 1,
  BestUse: 'Camping'
}, ()=>{});

Shirt.create({
  _id: 1,
  imageURL: 'https://source.unsplash.com/1600x900/?shirt',
  title: "Shirt Test",
  ranking: 4.5,
  reviews: 170,
  price: 35.00,
}, ()=>{});

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});