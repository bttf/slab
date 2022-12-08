import express, { Request, Response } from "express";
import playwright from "playwright";

// TODO https://www.imdb.com/title/tt0082783/parentalguide

async function scrapeGuide(req: Request, res: Response) {
  const browser = await playwright.chromium.launch({
    headless: true,
  });

  console.log("browser created");

  const page = await browser.newPage();

  await page.goto("https://www.imdb.com/title/tt0082783/parentalguide");

  console.log("navigating to page");

  const something = await page.$eval("#advisory-nudity", (headerElm) => {
    console.log("reading page");
    const data: any[] = [];
    const listElms = Array.from(headerElm.getElementsByTagName("li"));
    listElms.forEach((elm) => {
      console.log("collecting data...");
      data.push(elm.innerText.split("\n"));
    });
    return data;
  });

  console.log("Sex & Nudity for 'My Dinner with Andre' --->>>>", something);

  await page.waitForTimeout(5000); // wait
  await browser.close();

  res.send(something);
}

const app = express();

app.get("/", function (req, res) {
  console.log("req received");
  scrapeGuide(req, res);
});

app.listen(4200);
