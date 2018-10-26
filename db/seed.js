const { Tent, Shirt } = require('./index.js');

let campTitleOptions1 = ['REI', 'REI Co-op', 'Marmot', 'Mountain', 'Kelty', 'Tepui', 'Alps', 'Himalayan', 'Andes', 'Karakoram', 'Pyrenees', 'Sierra', 'Tian Shan', 'Ural', 'Cascade', 'Pamir', 'Alaska', 'Atlas', 'Uinta', 'Teton', 'Sawatch', 'Blue Ridge', 'Absaroka', 'Transantarctic', 'Big Agnes'];

let campTitleOptions2 = ['Limestone', 'Kingdom', 'Silhouette', 'Nature', 'Dome', 'Hut', 'Cabin', 'Lair', 'Quartz', 'Diamond', 'Jade', 'Howlite', 'Trailblazer', 'Obsidian', 'Coleman', 'Vango', 'Outwell', 'Cabella', 'Columbia', 'Castle', 'Fortress', 'Utopia', 'Safe Haven'];

let shirtTitleOptions1 = ['Intrepid', 'Sahara', 'Stealth', 'Bermuda', 'Backwoods', 'Patagonia', 'Bermuda', 'Balanced', 'All Around', 'Silver Woods', 'Bronze Ridge', 'Skyline', 'Shattered', 'Avant', 'REI Co-op', 'Bernal', 'Nine Trails', 'Lybek', 'Recycled', 'Columbia', 'Active', 'True Crew', 'Ollivanders'];

let shirtTitleOptions2 = ['Heathered', 'Mountain', 'Sweat-Resistant', 'Weatherproof', 'Sierra Collection', 'Lightweight', 'Tamiami', 'Henley', 'High Movement', 'Element', 'Breathable', 'Dry', 'Arcteryx', 'Middle-Earth', 'Asgard', 'Atlantis', 'Gotham', 'Ole', 'Trademark', 'Mithril'];

function getRandNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getShirtData(num) {
  let data = [];
  for(let i = 1; i <= num; i++) {

    let titlePart1 = shirtTitleOptions1[getRandNum(0, shirtTitleOptions1.length - 1)];
    let titlePart2 = shirtTitleOptions2[getRandNum(0, shirtTitleOptions2.length - 1)];

    let obj = {
      _id: i,
      imageURL: `https://s3-us-west-2.amazonaws.com/fec-project/shirt/S${i}.jpg`,
      title: `${titlePart1} ${titlePart2} Shirt`,
      ranking: getRandNum(0, 5),
      reviews: getRandNum(0, 100),
      price: getRandNum(10, 85)
    }
    data.push(obj);
  }
  return data;
}

function getTentData(num) {
  let data = [];
  for(let i = 1; i <= num; i++) {

    let sleepNum = getRandNum(1, 10);
    let sleepCap = sleepNum > 7 ? `8+ people` : `${sleepNum}-person`

    let titlePart1 = campTitleOptions1[getRandNum(0, campTitleOptions1.length - 1)];
    let titlePart2 = campTitleOptions2[getRandNum(0, campTitleOptions2.length - 1)];

    let obj = {
      _id: i,
      imageURL: `https://s3-us-west-2.amazonaws.com/fec-project/tents/${i}.jpg`,
      title: `${titlePart1} ${titlePart2} Tent`,
      ranking: getRandNum(0, 5),
      reviews: getRandNum(0, 100),
      price: getRandNum(100, 400),
      sleepingCapacity: sleepCap,
      packagedWeight: `${getRandNum(12, 25)} lbs. ${getRandNum(0, 16)} oz.`,
      NumberOfDoors: getRandNum(1, 2),
      BestUse: 'Camping'
    }
    data.push(obj);
  }
  return data;
}

tentData = getTentData(35);
shirtData = getShirtData(35);




Tent.create(tentData, ()=>{});
Shirt.create(shirtData, ()=>{});


// module.exports.tentData = tentData;
// module.exports.shirtData = shirtData;








