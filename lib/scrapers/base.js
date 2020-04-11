// create a new file with all common code

// new imports
const puppeteer = require('puppeteer');

// create a function for common use
const newAndTotal = (state, noneReported = 'None reported') => {
  const today = cases.length > 1 ? stat[0].slice(1) : noneReported;
  const total = cases.length > 1 ? stat[1] : stat[0];
  
  // return an array that we can destructure latter
  return [today, total];
}

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
    // using map here is a bit more idiomatic
    const stringsArr = [
      ...stateHTML.map(item => item.innerText),
      ...natHTML.map(item => item.innerText)
    ]

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

      const [newCases, totalCases] = newAndTotal(cases);
      const [newDeaths, totalDeaths] = newAndTotal(deaths);
      const [newRecovered, totalRecovered] = newAndTotal(recovered);

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
  return statsArr;
};
