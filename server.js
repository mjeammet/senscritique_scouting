const puppeteer = require('puppeteer');

const username = process.argv[2];
if (username == undefined){
    console.log("Please provide a username.");
    return;
}

(async () => {
    const browser = await puppeteer.launch({
        headless: true, // false
        // slowMo: 100,
        // devtools: true
    });
    const page = await browser.newPage();
    await page.goto("https://www.senscritique.com/" + username + "/contacts?type=SCOUTS");
    
    const scoutSelector = '.UserScout__LeftWrapper-sc-1l8x296-1';
    const scoutSection = await page.$eval(scoutSelector, text => text.innerText); // outerHTML, innerHTML, textContent 
    console.log(scoutSection.split("\n")[0]);

    // const scoutSectionSelector = '.UserContacts__WrapperUserContacts-sc-1t8sac4-7';
    // const scoutsList = await page.$$(scoutSelector, text => text.TextContent); // outerHTML, innerHTML, textContent 
    // console.log(scoutsList);
    // console.log(scoutsList[0]);

    // Closes browser, see you byyyyye
    await browser.close();
  })();
