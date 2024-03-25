import express from "express";
import next from "next";
import payload from "payload";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET;

// Getting nextHandler
const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
  port: PORT,
});
const nextHandler = nextApp.getRequestHandler();

async function start() {
  if (!PAYLOAD_SECRET) throw new Error("Couldn't find process.env.PAYLOAD_SECRET");

  await payload.init({
    secret: PAYLOAD_SECRET,
    express: app,
    onInit: async (cms) => {
      cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
    },
  });

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: ({ req, res }) => ({ req, res }),
    })
  );
  // Forwarding requests to nextHandler
  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js running");

    app.listen(PORT, () =>
      payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
    );
  });
}

start();
