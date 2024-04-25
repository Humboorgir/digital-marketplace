"use client";

import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import { PRODUCT_CATEGORIES } from "@/config";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatPrice";
import { Media } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const { items, removeItem } = useCart();
  const router = useRouter();

  const productIds = items.map(({ product }) => product.id);

  const hasItems = Boolean(items.length);
  const total = items.reduce((total, { product }) => total + product.price, 0);
  // 9% transaction fee
  const fee = (total * 9) / 100;

  const { mutate: createSession, isLoading } = trpc.payment.createSession.useMutation({
    onSuccess({ link }) {
      router.push(link);
    },
  });

  return (
    <Container className="py-12 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl tracking-tight text-gray-900 font-bold">Shopping card</h1>
      <h2 className="sr-only">Items in your shopping card</h2>
      {hasItems ? (
        <ul className="mt-12 divide-y divide-gray-200 border-b border-t border-gray-200 w-full max-w-2xl">
          {items.map(({ product }) => {
            const label = PRODUCT_CATEGORIES.find((x) => x.value == product.category)?.label;

            const { image } = product.images[0];

            return (
              <li key={product.id} className="flex py-8 sm:py-8">
                <div className="relative h-32 w-32 shrink-0">
                  {typeof image != "string" && image.url && (
                    <Image
                      fill
                      src={image.url}
                      alt="Product image"
                      className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  )}
                </div>

                <div className="ml-3 flex flex-1 flex-col sm:ml-6">
                  <Link
                    href={`/product/${product.id}`}
                    className="font-medium text-gray-700 hover:text-gray-800">
                    {product.name}
                  </Link>

                  <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>

                  <p className="mt-2 text-sm font-medium text-gray-900">$99.9</p>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(product.id)}
                    className="bg-red-200 hover:bg-red-100 text-red-800 hover:text-red-800 w-fit mt-2 text-sm">
                    <X className="w-5 h-5 mr-1" /> Remove product
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div
          className="mt-12 rounded-lg border-2 border-dashed border-zinc-200 p-12
          h-full w-full flex flex-col items-center justify-center text-center">
          <Image className="mb-4" height={200} width={200} src="/empty-cart.svg" alt="Empty cart" />
          <h3 className="font-semibold text-2xl">Your cart is empty</h3>
          <p className="text-muted-foreground mt-2">Whoops! Nothing to show you here.</p>
        </div>
      )}

      <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8 w-full max-w-2xl">
        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Subtotal</p>
            <p className="text-sm font-medium text-gray-900">${total}</p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <p className="text-sm text-muted-foreground">Flat Transaction Fee</p>
            <div className="text-sm font-medium text-gray-900">${fee}</div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-900">Order Total</h4>
            <div className="font-medium text-gray-900">${total + fee}</div>
          </div>
        </div>

        <Button
          disabled={isLoading}
          onClick={() => createSession({ productIds })}
          className="w-full mt-6"
          size="lg">
          Checkout
        </Button>
      </section>
    </Container>
  );
};

export default Page;
