const puppeteer = require('puppeteer');

module.exports = async() => {
  // launch a puppeteer instance and navigate to url
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://www.worldometers.info/coronavirus/country/us/');

  const statsScrape = await page.evaluate(() => {
    // get spans containing state and national data from DOM
    const html = document.querySelectorAll('#usa_table_countries_today tbody tr td');
    const stringsArr =
      [...html].map(item => item.innerText);

    // get an array containing an array for each location with its stats
    const chunks = [];
    stringsArr.forEach(stat => {  
      if(!chunks.length || chunks[chunks.length - 1].length == 11)
        chunks.push([]);
      chunks[chunks.length - 1].push(stat);
    });
    // remove 'totals' chunk
    chunks.pop();

    // munge nested arrays into objects with appropriate key-value pairs
    const statsArr = chunks.map(chunk => ({
      location: chunk[0].trim() === 'USA Total' ? 'United States' : chunk[0].trim(),
      totalCases: chunk[1].length === 0 ? 'None reported' : chunk[1].trim(),
      newCases: chunk[2].length === 0 ? 'None reported' : chunk[2].slice(1).trim(),
      totalDeaths: chunk[3].length === 0 ? 'None reported' : chunk[3].trim(),
      newDeaths: chunk[4].length === 0 ? 'None reported' : chunk[4].slice(1).trim(),
      activeCases: chunk[5].length === 0 ? 'None reported' : chunk[5].trim(),
      totalTests: chunk[8].length === 0 ? 'None reported' : chunk[8].trim()
    }));

    return statsArr;
  });

  browser.close();

  return statsScrape;
};
