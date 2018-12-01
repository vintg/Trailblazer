const {Pool, Client} = require('pg');
const path = require('path');
const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const config = require('../config');

const executeQuery = async(client, inputFile, targetTable, columns, truncate=0) => {
  const execute = (target, callback, truncate) => {
    if(truncate===1){
      client.query(`Truncate ${target}`, (err) => {
        if (err) {
          client.end();
          callback(err);
        } else {
          console.log(`Truncated ${target}`);
          callback(null, target);
        }
      });
    } else {
      callback(null,target);
    }
  };

  execute(targetTable, (err) =>{
    if (err) return console.log(`Error in Truncate Table: ${err}`);
    let stream = client.query(copyFrom(`COPY ${targetTable} (${columns}) FROM STDIN CSV`));
    let rs = fs.createReadStream(inputFile);
    rs.on('error', (error) =>{
      console.log(`Error in creating read stream ${error}`);
      client.release();
    });
    stream.on('error', (error) => {
      console.log(`Error in creating stream ${error}`);
      console.log(`${targetTable} (${columns.split(',').length}) = ${columns}`);
      client.release();
    });
    stream.on('end', () => {
      console.log(`Completed loading data into ${targetTable}`);
      client.release();
    });
    rs.pipe(stream);
  });

};

// control *************************************
// truncate = 1 to clear tables before inserting, must be 0 for append
const truncate = 0;
// columns must match table schema!!
const shirtCols = '_id, imageURL, title, ranking, reviews, price, productType';
const tentCols = '_id, imageURL, title, ranking, reviews, price, sleepingCapacity, packagedWeight, numberOfDoors, bestUse, productType';

//main init
const pool = new Pool({
  connectionString: config.DATABASE_URI
});

for (let i=1;i<=5;i++){
  // specify input file names
  let shirtpath = path.join(__dirname,`/data/shirts${i}.csv`);
  let tentpath = path.join(__dirname,`/data/tents${i}.csv`);

  pool.connect()
    .then(client => executeQuery(client, tentpath, 'tents', tentCols, truncate)
    .then(()=> { pool.connect()
      .then(client=>executeQuery(client, shirtpath, 'shirts', shirtCols, truncate))
      .catch(e=> console.log(e))
    })
    .catch(e=>console.log(e)));
}