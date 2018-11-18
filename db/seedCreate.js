const fs = require('fs');
const csv = require('fast-csv');
const faker = require('faker');
const path = require('path');

const randTent =()=> {
    imageURL: faker.image.avatar(),
    title: faker.commerce.productName(),
    ranking: (Math.random()*5).toFixed(2),
    reviews: parseInt(Math.random()*100),
    price: parseInt(Math.random()*400+100),
    sleepingCapacity: Math.random()<.2?
      `8+ people`:`${parseInt(Math.random()*5+2);}-person`,
    packagedWeight: parseInt(Math.random()*25+12),
    numberOfDoors: parseInt(Math.random()*2+1),
    bestUse: 'Camping',
    productType: 'Tent'
};

const randShirt =()=> {
    imageURL: faker.image.avatar(),
    title: faker.commerce.productName(),
    ranking: (Math.random()*5).toFixed(2),
    reviews: parseInt(Math.random()*100),
    price: parseInt(Math.random()*85+10),
    productType: 'Shirt'
  };

const createData = async()=>{
  console.log(`${nM}M Primary Records`);

  let shirtPath = path.join(__dirname,`shirts.csv`);
  let tentPath = path.join(__dirname,`tents.csv`);

  const option = (append)? {flags:'a'}:{};
  let shirt_csv = csv.createWriteStream({headers:false, objectMode: true}),
    shirtStream = fs.createWriteStream(shirtPath, option);
  let tent_csv = csv.createWriteStream({headers:false, objectMode: true}),
    tentStream = fs.createWriteStream(tentPath, option);

  shirtStream.on('finish', ()=> console.log('shirts complete'));
  tentStream.on('finish', ()=> console.log('tents complete'));

  shirt_csv.pipe(shirtStream);
  tent_csv.pipe(tentStream);

  for(let z=0;z<totalSize/batchSize;z++){
    for(let b=0;b<batchSize;b++){
      shirt_csv.write(randShirt());
      tent_csv.write(randTent());
    }
  }
  shirt_csv.end();
  tent_csv.end();
};

// control *******************************************
const nM = 1; // enter how many million primary recs to populate
const tableCt = 2;
const append = true;
const totalSize = nM/tableCt*Math.pow(10,6);
const batchSize = 200000;
//****************************************************

let hrstart = process.hrtime();
createData()
  .then(()=> {
    let hrend = process.hrtime(hrstart);
    console.info('Create time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  })
  .catch(e=>console.log(e));
