import { Express } from "express";
import configureServer from "./server";
import Logger from "./utils/winston";
import dotenv from "dotenv";
import { connectDatabase } from "./db/config";
dotenv.config();

const PORT: number | string = process.env.PORT || 3000;

(() => {
  try {
    connectDatabase();
    const app: Express = configureServer();

    app.listen(PORT, () => {
      Logger.info(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    Logger.error(`Error: ${error}`);
  }
})();
