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
});
