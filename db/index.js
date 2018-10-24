const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // this code solves a deprication warning for Mongoose mPromise
mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true });
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo DB is running');
});

let tentSchema = mongoose.Schema({
  _id: Number,
  imageURL: String,
  title: String,
  ranking: Number,
  reviews: Number,
  price: Number,
  sleepingCapacity: String,
  packagedWeight: String,
  NumberOfDoors: Number,
  BestUse: String
});

let shirtSchema = mongoose.Schema({
  _id: Number,
  imageURL: String,
  title: String,
  ranking: Number,
  reviews: Number,
  price: Number,
});

let Shirt = mongoose.model('Shirt', shirtSchema);
let Tent = mongoose.model('Tent', tentSchema);

module.exports.Tent = Tent;
module.exports.Shirt = Shirt;