const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const {Pool, Client} = require('pg');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const randTent =()=> {
  let sleepNum = parseInt(Math.random()*10);
  return {
    imageURL: faker.image.avatar(),
    title: faker.company.bs(),
    ranking: (Math.random()*5).toFixed(2),
    reviews: parseInt(Math.random()*100),
    price: parseInt(Math.random()*400+100),
    sleepingCapacity: sleepNum>7?
      `8+ people`:`${sleepNum}-person`,
    packagedWeight: parseInt(Math.random()*25+12),
    numberOfDoors: parseInt(Math.random()*2+1),
    bestUse: 'Camping',
    productType: 'Tent'
  };
};

const randShirt =()=> {
  return {
    imageURL: faker.image.avatar(),
    title: faker.company.bs(),
    ranking: (Math.random()*5).toFixed(2),
    reviews: parseInt(Math.random()*100),
    price: parseInt(Math.random()*85+10),
    productType: 'Shirt'
  };
};

//write to csv
// const q = 10;
// const start = 200000;
const n= 1000000;// const max = 600000;
// const inc = 100000;

// for(let ep=0;ep<q;ep++){
//   console.log('Epoch',ep);
//  var benchmark = [];

//  for(let n=start;n<=max;n+=inc){
    // let hrstart = process.hrtime();
console.time("create time");
for(let nMillion=0;nMillion<5;nMillion++){
    //console.time("write shirts");
    //{flags:'a'}
    var writer = csvWriter({sendHeaders:false});
    writer.pipe(fs.createWriteStream(path.join(__dirname,`shirts${nMillion+1}.csv`), {}));
    for (let i = 0; i< n; i++){
      writer.write(randShirt());
    }
    writer.end();
    //console.timeEnd("write shirts");

    //console.time("write tents");
    var writer = csvWriter({sendHeaders:false});
    writer.pipe(fs.createWriteStream(path.join(__dirname,`tents${nMillion+1}.csv`),
      {}));
    for (let j = 0; j< n; j++){
      writer.write(randTent());
    }
    writer.end();
    //console.timeEnd("write tents");
}
console.timeEnd("create time");
     // let hrend = process.hrtime(hrstart);
     // console.log(`Primary recs: ${n}, Execution time (hr): ${hrend[0]}s, Rate: ${parseInt(n/hrend[0])} rows/s`);
//    benchmark.push([n, hrend[0], n/hrend[0]]);
 // }

  // fs.appendFile(path.join(__dirname,'benchmark.csv'),
  //   benchmark.map(v => v.join(', ')).join('\n'),
  //   err => {if(err) throw err});
//}


// CREATE INDEX tents_type_index ON tents (productType);
// CREATE INDEX shirt_type_index ON shirts (productType);