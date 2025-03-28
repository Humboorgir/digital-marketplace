import express from "express";
import next from "next";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { getPayloadClient } from "./lib/getPayloadClient";
import { inferAsyncReturnType } from "@trpc/server";

export const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Getting nextHandler
const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
  port: PORT,
});
const nextHandler = nextApp.getRequestHandler();

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ req, res });
export type ExpressContext = inferAsyncReturnType<typeof createContext>;

async function start() {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
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
