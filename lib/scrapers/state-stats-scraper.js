const puppeteer = require('puppeteer');
const url = 'https://coronavirus.1point3acres.com/en';

const stateScrape = () => {
  return new Promise(async(resolve, reject) => {
    try {
      // launch a puppeteer instance
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      // navigate to url
      await page.goto(url);
      // return the html content after all the JS on the page has been executed
      const currentPage = await page.evaluate(() => {
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
            state: chunk[0].trim(),
            confirmed: chunk[1],
            deaths: chunk[2],
            fatalityRate: chunk[3],
            recovered: chunk[4]
          });
        });
        // return the array of state objects
        return stateArr;
      });
      // close the browser
      browser.close();
      return resolve(currentPage);
    } catch(e) {
      return reject(e);
    }
  });
};

stateScrape()
  .then(console.log)
  .catch(console.error);
