import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../lib/getPayloadClient";

export const paymentRouter = router({
  createSession: privateProcedure
    .input(z.object({ productIds: z.array(z.string()).min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      let { productIds } = input;

      const payload = await getPayloadClient();
      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productIds,
          },
        },
      });

      // [get authority code from zarinpal]
      // mock req
      const res = {
        authority: "100000AHA",
      };
      const { authority } = res;

      const order = await payload.create({
        collection: "orders",
        data: {
          _isPaid: false,
          products: products.map((prod) => prod.id),
          user: user.id,
          authority,
        },
      });

      return { link: `https://www.zarinpal.com/pg/StartPay/${authority}`, orderId: order.id };
    }),
});
