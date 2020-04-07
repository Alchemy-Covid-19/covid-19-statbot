
const puppeteer = require('puppeteer');
const url = 'https://coronavirus.1point3acres.com/en';

// new imports
require('dotenv').config();
require('../utils/connect')();
const mongoose = require('mongoose');
const Stats = require('../models/Stats');

const natScrape = async() => {

  // launch a puppeteer instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // navigate to url
  await page.goto(url);
  // return the html content after all the JS on the page has been executed
  const natArr = await page.evaluate(() => {
    const statsHTML = document.querySelectorAll('.country-row span');
    const natStrings = [];
        
    // get HTML for all states' statistics and pull out text for each state
    statsHTML.forEach(item => {
      natStrings.push(item.innerText);
    });

    // get an array containing an array for each state with its stats
    const chunks = [];
    natStrings.forEach(stat => {  
      if(!chunks.length || chunks[chunks.length - 1].length == 5)
        chunks.push([]);
      chunks[chunks.length - 1].push(stat);
    });

    // const dailyIncreaseRegex = /\+(\d{0,3},)?(\d{3},)?\d{0,3}/g;
    // const dailyDecreaseRegex = /\-(\d{0,3},)?(\d{3},)?\d{0,3}/g;
    // // extracts the daily total
    // const dailyTotalRegex = /(?<=\\n)(\d{0,3},)?(\d{3},)?\d{0,3}/g;

    
    // munge nested state arrays into objects with appropriate key-value pairs
    const natArr = [];
    chunks.forEach(chunk => {
      // const dailyTotal = chunk[1].match(dailyTotalRegex);
      const cases = chunk[1].split('\n');
      const deaths = chunk[2].split('\n');
      const recovered = chunk[4].split('\n');

      let newCases;
      let totalCases;
      if(cases.length > 1) {
        newCases = cases[0];
        totalCases = cases[1];
      } else {
        totalCases = cases[0];
      }

      let newDeaths;
      let totalDeaths;
      if(deaths.length > 1) {
        newDeaths = deaths[0];
        totalDeaths = deaths[1];
      } else {
        totalDeaths = deaths[0];
      }

      let newRecovered;
      let totalRecovered;
      if(recovered.length > 1) {
        newRecovered = recovered[0];
        totalRecovered = recovered[1];
      } else {
        totalRecovered = recovered[0];
      }

      natArr.push({
        location: chunk[0].slice(0, 13),
        totalCases,
        newCases,
        totalDeaths,
        newDeaths,
        fatalityRate: chunk[3],
        totalRecovered,
        newRecovered
      });
    });

    return natArr;

  });
  // close the browser
  browser.close();

  return Stats
    .create(natArr);
};

natScrape()
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoose.connection.close());
