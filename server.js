require('dotenv').config()

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

    // TODO Needs to log in as many people restrict their profile's access to logged in users.
    console.log('Login in as', process.env.LOGIN_USERNAME);

    console.log('Navigating to', username, "'s contacts, page 1.")
    await page.goto("https://www.senscritique.com/" + username + "/contacts?type=SCOUTS");
    
    // Get scout's URL 
    const scoutSelector = '.UserScout__Names-sc-1l8x296-5';
    const scoutSection = await page.$eval(scoutSelector, text => text.innerText); // outerHTML, innerHTML, textContent 
    let scoutSecondName = scoutSection.split("\n")[2].replace('@','');
    const scoutURL = "https://www.senscritique.com/" + scoutSecondName;

    // Navigate to scout's profile
    console.log('Trying to navigate to', scoutURL);
    const scoutProfile = await browser.newPage();
    await scoutProfile.goto(scoutURL);

    // // rejectCookies();
    // try{
    //     const continueWithout = await scoutProfile.$eval('.didomi-continue-without-agreeing');
    //     console.log(continueWithout);
    //     await continueWithout.click(".Text__SCText-sc-14ie3lm-0");
    // } catch(err){
    //     console.log("Cannot decline cookies.")
    // }

    let has_top10 = false; 
    try{
        const top10 = await scoutProfile.$eval(".CarouselTop10__SeeMoreText-sc-1syduh9-2", span => span.innerText);
        console.log(top10);
        await scoutProfile.click(".Text__SCText-sc-14ie3lm-0");
    } catch(err){
        console.log('No top10 here.');
    }

    // dans l'url des top10, c'estle numéro d'user qui est utilisé. 
    // or, je le trouve nulle part sur la page donc
    // j'ai peur qu'on doive cliquer sur le profil
    // parser la page pour trouver le top10, et cliquer sur "voir plus" 
    // pour accéder aux 10 premiers éléments de la liste

    // const scoutSectionSelector = '.UserContacts__WrapperUserContacts-sc-1t8sac4-7';
    // const scoutsList = await page.$$(scoutSelector, text => text.TextContent); // outerHTML, innerHTML, textContent 
    // console.log(scoutsList);
    // console.log(scoutsList[0]);

    // Closes browser, see you byyyyye
    // await browser.close();
  })();
