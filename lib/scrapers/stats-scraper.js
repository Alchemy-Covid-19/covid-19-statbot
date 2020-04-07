// new imports
const puppeteer = require('puppeteer');
const Stats = require('../models/Stats');

module.exports = async() => {
  // launch a puppeteer instance and navigate to url
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://coronavirus.1point3acres.com/en');

  // return the html content after all the JS on the page has been executed
  const statsArr = await page.evaluate(() => {
    // get spans containing state and national data from DOM
    const stateHTML = document.querySelectorAll('.stat span');
    const natHTML = document.querySelectorAll('.country-row span');
    
    // push text for each state and the whole country into array
    const stringsArr = [];
    stateHTML.forEach(item => {
      stringsArr.push(item.innerText);
    });
    natHTML.forEach(item => {
      stringsArr.push(item.innerText);
    });

    // get an array containing an array for each location with its stats
    const chunks = [];
    stringsArr.forEach(stat => {  
      if(!chunks.length || chunks[chunks.length - 1].length == 5)
        chunks.push([]);
      chunks[chunks.length - 1].push(stat);
    });
    
    // munge nested arrays into objects with appropriate key-value pairs
    const statsArr = [];
    chunks.forEach(chunk => {
      // chunk.replace(/,/g, '');
      const location = chunk[0].split('\n')[0].trim();
      const cases = chunk[1].split('\n');
      const deaths = chunk[2].split('\n');
      const fatalityRate = chunk[3];
      const recovered = chunk[4].split('\n');

      let newCases;
      let totalCases;
      if(cases.length > 1) {
        newCases = cases[0].slice(1).replace(/,/g, '');
        totalCases = cases[1];
      } else {
        newCases = null;
        totalCases = cases[0];
      }

      let newDeaths;
      let totalDeaths;
      if(deaths.length > 1) {
        newDeaths = deaths[0].slice(1).replace(/,/g, '');
        totalDeaths = deaths[1];
      } else {
        newDeaths = null;
        totalDeaths = deaths[0];
      }

      let newRecovered;
      let totalRecovered;
      if(recovered.length > 1) {
        newRecovered = recovered[0].slice(1).replace(/,/g, '');
        totalRecovered = recovered[1];
      } else {
        newRecovered = null;
        totalRecovered = recovered[0];
      }

      statsArr.push({
        location,
        totalCases: totalCases.replace(/,/g, ''),
        newCases,
        totalDeaths: totalDeaths.replace(/,/g, ''),
        newDeaths,
        fatalityRate,
        totalRecovered: totalRecovered.replace(/,/g, ''),
        newRecovered,
        date: Date().slice(4, 15)
      });
    });

    return statsArr;
  });

  // close the browser
  browser.close();

  // create documents according to model
  return Stats
    .create(statsArr);
};
