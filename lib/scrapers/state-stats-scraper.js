const puppeteer = require('puppeteer');
const url = 'https://coronavirus.1point3acres.com/en';

// new imports
require('dotenv').config();
require('../utils/connect')();
const mongoose = require('mongoose');
const Stats = require('../models/Stats');

const stateScrape = async() => {

  // launch a puppeteer instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // navigate to url
  await page.goto(url);
  // return the html content after all the JS on the page has been executed
  const stateArr = await page.evaluate(() => {
    const statsHTML = document.querySelectorAll('.stat span');
    const stateStrings = [];
        
    // get HTML for all states' statistics and pull out text for each state
    statsHTML.forEach(item => {
      stateStrings.push(item.innerText);
    });

    // get an array containing an array for each state with its stats
    const chunks = [];
    stateStrings.forEach(stat => {  
      if(!chunks.length || chunks[chunks.length - 1].length == 5)
        chunks.push([]);
      chunks[chunks.length - 1].push(stat);
    });

    // munge nested state arrays into objects with appropriate key-value pairs
    const stateArr = [];
    chunks.forEach(chunk => {
      stateArr.push({
        location: chunk[0].trim(),
        totalCases: chunk[1],
        totalDeaths: chunk[2],
        fatalityRate: chunk[3],
        totalRecovered: chunk[4]
      });
    });


    return stateArr;

    // return the array of state objects
    // return stateArr;
  });
  // close the browser
  browser.close();
  return Stats
    .create(stateArr);
};

stateScrape()
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoose.connection.close());
