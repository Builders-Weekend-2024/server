import { Express } from "express";
import configureServer from "./server";
import Logger from "./utils/winston";
import dotenv from "dotenv";
dotenv.config();

const PORT: number | string = process.env.PORT || 3000;

(() => {
  try {
    const app: Express = configureServer();

    app.listen(PORT, () => {
      Logger.info(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    Logger.error(`Error: ${error}`);
  }
})();
