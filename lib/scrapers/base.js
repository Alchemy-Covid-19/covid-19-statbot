const puppeteer = require('puppeteer');

// create a function for common use
const newAndTotal = (stats) => {
  const today = stats.length > 1 ? stats[0].slice(1) : 'None reported';
  const total = stats.length > 1 ? stats[1] : stats[0];
  console.log(total);
  // return an array that we can destructure latter
  return [today, total];
};

module.exports = async() => {
  // launch a puppeteer instance and navigate to url
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://coronavirus.1point3acres.com/en');

  const statsScrape = await page.evaluate(() => {
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
    const statsArr = chunks.map(chunk => {
      const location = chunk[0].split('\n')[0].trim();
      const cases = chunk[1].split('\n');
      const deaths = chunk[2].split('\n');
      const fatalityRate = chunk[3];
      const recovered = chunk[4].split('\n');
      const noneReported = 'None reported';

      let newCases;
      let totalCases;
      if(cases.length > 1) {
        newCases = cases[0].slice(1);
        totalCases = cases[1];
      } else {
        newCases = noneReported;
        totalCases = cases[0];
      }

      let newDeaths;
      let totalDeaths;
      if(deaths.length > 1) {
        newDeaths = deaths[0].slice(1);
        totalDeaths = deaths[1];
      } else {
        newDeaths = noneReported;
        totalDeaths = deaths[0];
      }

      let newRecovered;
      let totalRecovered;
      if(recovered.length > 1) {
        newRecovered = recovered[0].slice(1);
        totalRecovered = recovered[1];
      } else {
        newRecovered = noneReported;
        totalRecovered = recovered[0];
      }

      return {
        location,
        totalCases,
        newCases,
        totalDeaths,
        newDeaths,
        fatalityRate,
        totalRecovered,
        newRecovered
      };
    });

    return statsArr;
  });

  // close the browser
  browser.close();
  // update statistics for each location upon new scrape
  return statsScrape;
};
