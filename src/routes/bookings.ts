import express from "express";
import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { path as rootPath } from "app-root-path";

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
