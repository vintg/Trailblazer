const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Tent, Shirt } = require("../db/index.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client/dist`));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Routes-Endpoints
app.get("/product/:id", (req, res) => {
  const file = path.join(`${__dirname}/../client/dist/index.html`);
  res.sendFile(file); // When using sendFile if you have '..' in the file name the browser thinks its malicious. Need to use path.join or path.resolve to bypass'
});

app.get("/product/data/:id", (req, res) => {
  const { id } = req.params;
  const model = id <= 51 ? Tent : Shirt;

  model
    .find({ _id: id })
    .exec()
    .then(item => res.status(200).send(item))
    .catch(err => console.log("error", err));
});

app.get("/data/shirts", (req, res) => {
  Shirt.aggregate([{ $sample: { size: 4 } }]).exec((err, data) => {
    if (err) {
      console.log("Server Error", err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/data/tents", (req, res) => {
  Tent.aggregate([{ $sample: { size: 5 } }]).exec((err, data) => {
    if (err) {
      console.log("Server Error", err);
    } else {
      res.status(200).send(data);
    }
  });
});

const port = 3004;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
