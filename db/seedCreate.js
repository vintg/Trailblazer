const fs = require('fs');
const csv = require('fast-csv');
const faker = require('faker');
const path = require('path');

const randTent =()=> {
  let sleepNum = parseInt(Math.random()*8+2);
  return {
    imageURL: faker.image.avatar(),
    title: faker.commerce.productName(),
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
    title: faker.commerce.productName(),
    ranking: (Math.random()*5).toFixed(2),
    reviews: parseInt(Math.random()*100),
    price: parseInt(Math.random()*85+10),
    productType: 'Shirt'
  };
};

const createData = async(nM)=>{
  console.log(`${nM}M Primary Records`);
//  console.time("create time");

  //define file paths
  const shirtPath = path.join(__dirname,`shirts.csv`);
  const tentPath = path.join(__dirname,`tents.csv`);

  //create write streams
  const option = (append)? {flags:'a'}:{};

  const shirt_csv = csv.createWriteStream({headers:false, objectMode: true}),
    shirtStream = fs.createWriteStream(shirtPath, option);

  const tent_csv = csv.createWriteStream({headers:false, objectMode: true}),
    tentStream = fs.createWriteStream(tentPath, option);

  shirtStream.on('finish', ()=> console.log('shirts complete'));
  tentStream.on('finish', ()=> console.log('tents complete'));

  shirt_csv.pipe(shirtStream);
  tent_csv.pipe(tentStream);

  //write data
  for(let z=0;z<0.5*nM*Math.pow(10,6);z++){
    shirt_csv.write(randShirt());
    tent_csv.write(randTent());
  }

  //end streams
  shirt_csv.end();
  tent_csv.end();

//  console.timeEnd("create time");

};

// control *****************************************
const nM = .5; // enter how many million primary recs to populate
const append = true;

let hrstart = process.hrtime();
createData(nM)
  .then(()=> {
    let hrend = process.hrtime(hrstart);
    console.info('Create time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  })
  .catch(e=>console.log(e));
