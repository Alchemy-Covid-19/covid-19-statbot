const puppeteer = require('puppeteer');

const newAndTotal = (stats, noneReported = 'None reported') => {
  const today = stats.length > 1 ? stats[0].slice(1) : noneReported;
  const total = stats.length > 1 ? stats[1] : stats[0];

  return [today, total];
};

module.exports = async() => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://coronavirus.1point3acres.com/en');

  const statsScrape = await page.evaluate(() => {
    const stateHTML = document.querySelectorAll('.stat span');
    const natHTML = document.querySelectorAll('.country-row span');

    const stringsArr = [
      ...stateHTML.map(item => item.innerText),
      ...natHTML.map(item => item.innerText)
    ];

    const chunks = [];
    stringsArr.forEach(stat => {  
      if(!chunks.length || chunks[chunks.length - 1].length == 5)
        chunks.push([]);
      chunks[chunks.length - 1].push(stat);
    });

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

  browser.close();

  return statsScrape;
};
