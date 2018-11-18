const {Pool, Client} = require('pg');
const path = require('path');
const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const csv = require('fast-csv');
const faker = require('faker');
const dotenv = require('dotenv');
dotenv.config();

const {Readable} = require('stream');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const randTent =()=> [
    faker.image.avatar(),
    faker.commerce.productName(),
    (Math.random()*5).toFixed(2),
    parseInt(Math.random()*100),
    parseInt(Math.random()*400+100),
    parseInt(Math.random()*5+2)>7?
      `8+ people`:`${parseInt(Math.random()*5+2)}-person`,
    parseInt(Math.random()*25+12),
    parseInt(Math.random()*2+1),
    'Camping',
    'Tent'
  ].join();

const randShirt =()=> [
    faker.image.avatar(),
    faker.commerce.productName(),
    (Math.random()*5).toFixed(2),
    parseInt(Math.random()*100),
    parseInt(Math.random()*85+10),
    'Shirt'
  ].join();

pool.connect()
  .then(client=> {
      const inStream = new Readable({
        read() {}
      });

      for (let i =0;i<Math.pow(10,3);i++){
        inStream.push(randShirt()+'\n');
      }
      //path.join(__dirname,`shirtstest.csv`);
      inStream.push(null); // No more data

      let out = client.query(copyFrom('COPY shirts FROM STDIN'));
      inStream.pipe(out);

      out.on('end', ()=> client.release());
    }).catch(e=>console.log('error',e));

//  // let tentPath = path.join(__dirname,`tents.csv`);

//   let writer = csv.createWriteStream({headers:false, objectMode: true}),
//     shirtStream = fs.createWriteStream(shirtPath);
//  // let tent_csv = csv.createWriteStream({headers:false, objectMode: true}),
//   //  tentStream = fs.createWriteStream(tentPath, option);

//   shirtStream.on('finish', ()=> console.log('shirts complete'));
//  //tentStream.on('finish', ()=> console.log('tents complete'));

//   writer.pipe(shirtStream);
//  // tent_csv.pipe(tentStream);

// writeOneMillionTimes(writer,'hihi',

// function writeOneMillionTimes(writer, data, encoding, callback) {
//   let i = 1000000;
//   write();
//   function write() {
//     let ok = true;
//     do {
//       i--;
//       if (i === 0) {
//         // last time!
//         writer.write(data, encoding, callback);
//       } else {
//         // see if we should continue, or wait
//         // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       // had to stop early!
//       // write some more once it drains
//       writer.once('drain', write);
//     }
//   }
// }





