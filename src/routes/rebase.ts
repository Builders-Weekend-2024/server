import express from "express";
import { Router, Request, Response } from "express";
import puppeteer from "puppeteer";

export const rebaseRouter: Router = express.Router();

rebaseRouter.post("/", async (req: Request, res: Response) => {
  const { roomId } = req.body;
  const data = await imageScraper(roomId);
  res.send(data);
});

const imageScraper = async (roomId: string) => {
  // Start a Puppeteer session
  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false,
  });

  // Open a new page
  const page = await browser.newPage();

  try {
    // Navigate to the target URL
    await page.goto(`https://www.instabase.jp/space/${roomId}/images`, {
      waitUntil: "domcontentloaded",
    });

    // Extract image sources from the page
    const imageSources = await page.evaluate(() =>
      Array.from(document.getElementsByTagName("img"), (e) =>
        e.getAttribute("src")
      )
    );

    const filteredImages = imageSources
      .filter((image) => {
        return image?.endsWith("jpeg");
      })
      .slice(0, 5)
      .map((imageSrc) => {
        return "https://instabase.jp" + imageSrc;
      });

    return filteredImages;
  } finally {
    await browser.close();
  }
};
