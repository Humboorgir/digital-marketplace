import dotenv from "dotenv";
import path from "path";

import type { InitOptions } from "payload/config";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

let cache = (global as any).payload;

if (!cache) {
  cache = (global as any).payload = {
    client: null,
    promise: null,
  };
}

type Args = Partial<InitOptions>;
export const getPayloadClient = async (initOptions: Args) => {
  if (!process.env.PAYLOAD_SECRET) throw new Error("Couldn't find process.env.PAYLOAD_SECRET");
};
