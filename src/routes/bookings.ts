import express from "express";
import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { path as rootPath } from "app-root-path";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const bookingsRouter: Router = express.Router();

bookingsRouter.get("/", (req: Request, res: Response) => {
  try {
    const bookingsPath: string = path.join(rootPath, "data", "bookings.json");
    const bookings = JSON.parse(fs.readFileSync(bookingsPath, "utf8"));
    res.json(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
});

bookingsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const baseURL = process.env.BASE_URL;
    const passedId = req.params.id;
    const appendedURL = `${baseURL}/cdn/rooms/${passedId}/space_to_spaces.json`;
    
    const response = await axios.get(appendedURL);

    res.send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});
