import { z } from "zod";
import { credentialsValidator } from "../lib/validators/credentials-validator";
import { getPayloadClient } from "../lib/getPayloadClient";

import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  createPayloadUser: publicProcedure.input(credentialsValidator).mutation(async ({ input }) => {
    const { email, password } = input;
    const payload = await getPayloadClient();

    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (users.length) throw new TRPCError({ code: "CONFLICT" });
    await payload.create({
      collection: "users",
      data: {
        email: email,
        password,
        role: "user",
      },
    });

    return { success: true, sentToEmail: email };
  }),
  verifyEmail: publicProcedure.input(z.object({ token: z.string() })).query(async ({ input }) => {
    const { token } = input;

    const payload = await getPayloadClient();
    const verificationSuccess = await payload.verifyEmail({
      collection: "users",
      token,
    });

    if (!verificationSuccess) {
      console.log("not successful");
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return { success: true };
  }),
  signIn: publicProcedure.input(credentialsValidator).mutation(async ({ input, ctx }) => {
    const { email, password } = input;
    const { res } = ctx;
    const payload = await getPayloadClient();
    try {
      await payload.login({
        collection: "users",
        data: {
          email,
          password,
        },
        res,
      });
      return { success: true };
    } catch (e) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
  }),
});
