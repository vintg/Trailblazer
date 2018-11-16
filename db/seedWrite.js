const {Pool, Client} = require('pg');
const path = require('path');
const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

// control *************************************
// specify input file names
const shirtpath = path.join(__dirname,`shirts.csv`);
const tentpath = path.join(__dirname,`tents.csv`);
// truncate = 1 to clear tables before inserting
const truncate = 0;
// column paths must match table schema!!
const shirtCols = 'imageURL, title, ranking, reviews, price, productType';
const tentCols = 'imageURL, title, ranking, reviews, price, sleepingCapacity, packagedWeight, numberOfDoors, bestUse, productType';
//*********************************************

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect()
  .then( client => {
    let hrstart = process.hrtime();
    executeQuery(client, tentpath, 'tents', tentCols, truncate)
      .then(()=> {
        pool.connect()
          .then(client =>{
            executeQuery(client, shirtpath, 'shirts', shirtCols, truncate)
              .then(()=> {
                let hrend = process.hrtime(hrstart);
                console.info('Copy time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
                pool.end();
              })
              .catch(e=> console.log(e))
          })
          .catch(e=> console.log(e));
      })
  })
  .catch(e=> console.log(e));

// CREATE INDEX tents_type_index ON tents (productType);
// CREATE INDEX shirt_type_index ON shirts (productType);

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