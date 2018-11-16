const {Pool, Client} = require('pg');
const path = require('path');
const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const shirtCols = 'imageURL, title, ranking, reviews, price, productType';
const tentCols = 'imageURL, title, ranking, reviews, price, sleepingCapacity, packagedWeight, numberOfDoors, bestUse, productType';

const shirtpath = path.join(__dirname,`shirts.csv`);
const tentpath = path.join(__dirname,`tents.csv`);

pool.connect()
    .then(client => executeQuery(client, shirtpath, 'shirts', shirtCols))
    .catch(e=> console.log(e));

pool.connect()
    .then( client => executeQuery(client, tentpath, 'tents', tentCols))
    .catch(e=> console.log(e));

pool.end();

const executeQuery = (client, inputFile, targetTable, columns) => {
  const execute = (target, callback) => {
    client.query(`Truncate ${target}`, (err) => {
      if (err) {
        client.end();
        callback(err);
      } else {
        console.log(`Truncated ${target}`);
        callback(null, target);
      }
    });
  };

  execute(targetTable, (err) =>{
    if (err) return console.log(`Error in Truncate Table: ${err}`);

    console.time("copy time");
    let stream = client.query(copyFrom(`COPY ${targetTable} (${columns}) FROM STDIN CSV`));
    let rs = fs.createReadStream(inputFile);

    rs.on('error', (error) =>{
      console.log(`Error in creating read stream ${error}`);
    });
    stream.on('error', (error) => {
      console.log(`Error in creating stream ${error}`);
    });
    stream.on('end', () => {
      console.log(`Completed loading data into ${targetTable}`);
      client.release();
    });
    rs.pipe(stream);
  });

  console.timeEnd("copy time");

};

// CREATE INDEX tents_type_index ON tents (productType);
// CREATE INDEX shirt_type_index ON shirts (productType);