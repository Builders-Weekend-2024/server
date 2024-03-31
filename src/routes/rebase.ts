import express from "express";
import { Router, Request, Response } from "express";
import puppeteer from "puppeteer";
import axios from "axios";

export const rebaseRouter: Router = express.Router();

rebaseRouter.post("/", async (req: Request, res: Response) => {
  const { roomId } = req.body;
  const images = await imageScraper(roomId);
  const base64Images = await getImageBase64(images);

  res.send(base64Images);
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

async function getImageBase64(urls: string[]) {
  try {
    const responses = await Promise.all(
      urls.map((url) => axios.get(url, { responseType: "arraybuffer" }))
    );
    const base64Images = await Promise.all(
      responses.map((response) => {
        const contentType = response.headers["content-type"];
        const buffer = Buffer.from(response.data, "binary");
        return `data:${contentType};base64,${buffer.toString("base64")}`;
      })
    );
    return base64Images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}
