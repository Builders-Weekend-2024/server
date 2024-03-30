import express from "express";
import { Router, Request, Response } from "express";
import FormData from "form-data";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const imagesRouter: Router = express.Router();

imagesRouter.post("/", async (req: Request, res: Response) => {
  if (!process.env.API_URL || !process.env.API_KEY) {
    res
      .status(400)
      .send({ error: "API_URL and API_KEY env variables are required" });
    return;
  }

  if (!req.body.prompt || !req.body.search_prompt || !req.body.image) {
    res.status(400).send({ error: "Missing required fields" });
    return;
  }

  let base64Image = req.body.image;

  if (base64Image.includes("base64,")) {
    base64Image = base64Image.split("base64,")[1];
  }

  const imageBuffer = Buffer.from(base64Image, "base64");

  const formData = {
    image: imageBuffer,
    prompt: req.body.prompt,
    search_prompt: req.body.search_prompt,
    negative_prompt: req.body.negative_prompt ? req.body.negative_prompt : "",
    output_format: "webp",
  };

  let response = null;

  try {
    response = await axios.postForm(
      process.env.API_URL,
      axios.toFormData(formData, new FormData()),
      {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          Accept: "image/*",
        },
      }
    );
  } catch (error) {
    res.status(401).send({ error: error });
    return;
  }

  if (response.status === 200) {
    try {
      const imageBase64 = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      res.status(200).send({ data: imageBase64 });
      return;
    } catch (error) {
      res.status(500).send({ error: error });
      return;
    }
  }

  res.status(500).send({ error: response.data });
  return;
});
